import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DoctorProfile } from '../../../domain/models/doctor-profile.model';
import { AppIconComponent } from '../../../../../shared/components/app-icon/app-icon.component';
@Component({
  selector: 'app-care-section',
  imports: [AppIconComponent],
  templateUrl: './care-section.component.html',
  styleUrl: './care-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareSectionComponent {
  readonly profile = input.required<DoctorProfile>();
}
