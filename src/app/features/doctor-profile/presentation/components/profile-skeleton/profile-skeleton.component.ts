import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrandLogoComponent } from '../../../../../shared/components/brand-logo/brand-logo.component';
@Component({
  selector: 'app-profile-skeleton',
  imports: [BrandLogoComponent],
  templateUrl: './profile-skeleton.component.html',
  styleUrl: './profile-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSkeletonComponent {}
