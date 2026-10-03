import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { AppIconComponent } from '../app-icon/app-icon.component';
export interface DialogContent {
  readonly title: string;
  readonly description: string;
  readonly label?: string;
}
@Component({
  selector: 'app-info-dialog',
  imports: [AppIconComponent],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoDialogComponent {
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  readonly content = signal<DialogContent>({ title: '', description: '' });
  open(content: DialogContent): void {
    this.content.set(content);
    this.dialog().nativeElement.showModal();
  }
  close(): void {
    this.dialog().nativeElement.close();
  }
  closeOnBackdrop(event: MouseEvent): void {
    if (event.target !== this.dialog().nativeElement) return;
    const rect = this.dialog().nativeElement.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      this.close();
  }
}
