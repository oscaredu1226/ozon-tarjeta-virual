import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { DoctorProfile } from '../../../domain/models/doctor-profile.model';
import { DoctorInfoComponent } from '../doctor-info/doctor-info.component';
import { DoctorWelcomeComponent } from '../doctor-welcome/doctor-welcome.component';
import { DoctorContactToolsComponent } from '../doctor-contact-tools/doctor-contact-tools.component';
import { AppIconComponent } from '../../../../../shared/components/app-icon/app-icon.component';
import { BrandLogoComponent } from '../../../../../shared/components/brand-logo/brand-logo.component';
@Component({
  selector: 'app-doctor-header',
  imports: [
    DoctorInfoComponent,
    DoctorWelcomeComponent,
    DoctorContactToolsComponent,
    AppIconComponent,
    BrandLogoComponent,
  ],
  templateUrl: './doctor-header.component.html',
  styleUrl: './doctor-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorHeaderComponent {
  readonly profile = input.required<DoctorProfile>();
  readonly loadedPhoto = signal<string | null>(null);
  readonly failedPhoto = signal<string | null>(null);
  readonly displayPhoto = computed(() =>
    this.profile().photo !== this.failedPhoto() ? this.profile().photo : null,
  );
}
