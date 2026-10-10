import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { AppIconComponent } from '../../../../../shared/components/app-icon/app-icon.component';
import { resolveProfileUrl } from '../../../../../shared/utils/profile-url';

@Component({
  selector: 'app-profile-qr',
  imports: [AppIconComponent],
  templateUrl: './profile-qr.component.html',
  styleUrl: './profile-qr.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileQrComponent {
  private readonly document = inject(DOCUMENT);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  readonly profileUrl = resolveProfileUrl(
    this.document.location.href,
    this.document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
  );
  readonly image = signal<string | null>(null);
  readonly loading = signal(false);
  readonly failed = signal(false);

  open(): void {
    const dialog = this.dialog().nativeElement;
    if (!dialog.open) dialog.showModal();
    if (!this.image()) void this.generate();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  closeOnBackdrop(event: MouseEvent): void {
    const dialog = this.dialog().nativeElement;
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      this.close();
    }
  }

  async generate(): Promise<void> {
    if (this.loading()) return;
    this.loading.set(true);
    this.failed.set(false);
    try {
      const { default: QRCode } = await import('qrcode');
      this.image.set(
        await QRCode.toDataURL(this.profileUrl, {
          errorCorrectionLevel: 'M',
          margin: 4,
          width: 512,
          color: { dark: '#073b5c', light: '#ffffff' },
        }),
      );
    } catch {
      this.failed.set(true);
    } finally {
      this.loading.set(false);
    }
  }
}
