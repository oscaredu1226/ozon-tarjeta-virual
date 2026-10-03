import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DoctorProfile } from '../../../domain/models/doctor-profile.model';
import { AppIconComponent } from '../../../../../shared/components/app-icon/app-icon.component';

@Component({
  selector: 'app-doctor-welcome',
  imports: [AppIconComponent],
  templateUrl: './doctor-welcome.component.html',
  styleUrl: './doctor-welcome.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorWelcomeComponent {
  readonly profile = input.required<DoctorProfile>();
}
