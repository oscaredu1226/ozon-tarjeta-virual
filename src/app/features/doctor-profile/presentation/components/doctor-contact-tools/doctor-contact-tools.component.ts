import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppIconComponent } from '../../../../../shared/components/app-icon/app-icon.component';

@Component({
  selector: 'app-doctor-contact-tools',
  imports: [AppIconComponent],
  templateUrl: './doctor-contact-tools.component.html',
  styleUrl: './doctor-contact-tools.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorContactToolsComponent {}
