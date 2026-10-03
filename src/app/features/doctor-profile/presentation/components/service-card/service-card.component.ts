import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DoctorService, ServiceCategory } from '../../../domain/models/doctor-profile.model';
import {
  AppIconComponent,
  IconName,
} from '../../../../../shared/components/app-icon/app-icon.component';
@Component({
  selector: 'app-service-card',
  imports: [AppIconComponent],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  readonly service = input.required<DoctorService>();
  readonly icons: Record<ServiceCategory, IconName> = {
    ozone: 'ozone-molecule',
    pain: 'spine',
    consultation: 'stethoscope',
  };
}
