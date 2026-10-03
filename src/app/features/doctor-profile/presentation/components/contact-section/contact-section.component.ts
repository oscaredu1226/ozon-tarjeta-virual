import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { DoctorProfile } from '../../../domain/models/doctor-profile.model';
import { AppIconComponent } from '../../../../../shared/components/app-icon/app-icon.component';
import { SocialLinksComponent } from '../social-links/social-links.component';
@Component({
  selector: 'app-contact-section',
  imports: [AppIconComponent, SocialLinksComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  readonly profile = input.required<DoctorProfile>();
  readonly phoneHref = input<string | null>(null);
  readonly unavailable = output<string>();
  readonly networks = computed(() =>
    this.profile().socialNetworks.filter((network) => network.url),
  );
  readonly whatsappHref = computed(() =>
    this.profile().whatsapp ? 'https://wa.me/' + this.profile().whatsapp!.replace(/\D/g, '') : null,
  );
}
