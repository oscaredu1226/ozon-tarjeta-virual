import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { DoctorProfileService } from '../../../application/services/doctor-profile.service';
import { DOCTOR_PROFILE_PROVIDERS } from '../../../doctor-profile.providers';
import { CareSectionComponent } from '../../components/care-section/care-section.component';
import { DoctorHeaderComponent } from '../../components/doctor-header/doctor-header.component';
import { DoctorActionsComponent } from '../../components/doctor-actions/doctor-actions.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { InfoDialogComponent } from '../../../../../shared/components/info-dialog/info-dialog.component';
import { ProfileSkeletonComponent } from '../../components/profile-skeleton/profile-skeleton.component';
import { BrandLogoComponent } from '../../../../../shared/components/brand-logo/brand-logo.component';
import { AppIconComponent } from '../../../../../shared/components/app-icon/app-icon.component';
@Component({
  selector: 'app-doctor-profile-page',
  imports: [
    DoctorHeaderComponent,
    DoctorActionsComponent,
    ServicesSectionComponent,
    CareSectionComponent,
    ContactSectionComponent,
    InfoDialogComponent,
    ProfileSkeletonComponent,
    BrandLogoComponent,
    AppIconComponent,
  ],
  providers: DOCTOR_PROFILE_PROVIDERS,
  templateUrl: './doctor-profile-page.component.html',
  styleUrl: './doctor-profile-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorProfilePageComponent {
  readonly facade = inject(DoctorProfileService);
  private readonly dialog = viewChild.required(InfoDialogComponent);
  showUnavailable(title: string): void {
    this.dialog().open({
      title,
      label: 'DATOS DE CONTACTO PENDIENTES',
      description:
        'Esta acción estará disponible cuando se añadan los datos de contacto del consultorio.',
    });
  }
}
