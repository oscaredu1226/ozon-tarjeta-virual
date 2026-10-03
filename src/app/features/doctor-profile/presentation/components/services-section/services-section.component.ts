import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DoctorService } from '../../../domain/models/doctor-profile.model';
import { ServiceCardComponent } from '../service-card/service-card.component';
@Component({
  selector: 'app-services-section',
  imports: [ServiceCardComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSectionComponent {
  readonly services = input.required<readonly DoctorService[]>();
}
