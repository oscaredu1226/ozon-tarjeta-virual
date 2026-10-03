import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DoctorProfile } from '../../../domain/models/doctor-profile.model';
@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrl: './doctor-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorInfoComponent {
  readonly profile = input.required<DoctorProfile>();
}
