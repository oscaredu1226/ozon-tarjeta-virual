import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SocialNetwork, SocialNetworkType } from '../../../domain/models/doctor-profile.model';
import {
  AppIconComponent,
  IconName,
} from '../../../../../shared/components/app-icon/app-icon.component';
@Component({
  selector: 'app-social-links',
  imports: [AppIconComponent],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  readonly networks = input.required<readonly SocialNetwork[]>();
  readonly unavailable = output<string>();
  readonly icons: Record<SocialNetworkType, IconName> = {
    instagram: 'brand-instagram',
    facebook: 'brand-facebook',
    linkedin: 'brand-linkedin',
  };
}
