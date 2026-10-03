import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
@Component({
  selector: 'app-brand-logo',
  templateUrl: './brand-logo.component.html',
  styleUrl: './brand-logo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandLogoComponent {
  readonly source = input('assets/brand/ozon-original.jpg');
  private readonly failedSource = signal<string | null>(null);
  readonly available = computed(() => this.source() !== this.failedSource());
  markUnavailable(): void {
    this.failedSource.set(this.source());
  }
}
