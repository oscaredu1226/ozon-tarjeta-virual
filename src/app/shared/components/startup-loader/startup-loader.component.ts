import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
@Component({
  selector: 'app-startup-loader',
  imports: [BrandLogoComponent],
  templateUrl: './startup-loader.component.html',
  styleUrl: './startup-loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupLoaderComponent {
  readonly failed = input(false);
  reload(): void {
    window.location.reload();
  }
}
