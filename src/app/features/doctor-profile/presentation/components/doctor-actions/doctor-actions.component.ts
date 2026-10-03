import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import {
  ContactAction,
  ContactActionId,
} from '../../../application/services/doctor-profile.service';
import {
  AppIconComponent,
  IconName,
} from '../../../../../shared/components/app-icon/app-icon.component';
@Component({
  selector: 'app-doctor-actions',
  imports: [AppIconComponent],
  templateUrl: './doctor-actions.component.html',
  styleUrl: './doctor-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorActionsComponent {
  readonly actions = input.required<readonly ContactAction[]>();
  readonly unavailable = output<string>();
  readonly icons: Record<ContactActionId, IconName> = {
    whatsapp: 'brand-whatsapp',
    appointment: 'calendar-event',
    phone: 'phone',
    location: 'map-pin',
  };
}
