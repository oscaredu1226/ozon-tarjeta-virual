import { ChangeDetectionStrategy, Component, input } from '@angular/core';
export type IconName =
  | 'calendar-event'
  | 'phone'
  | 'map-pin'
  | 'ozone-molecule'
  | 'spine'
  | 'stethoscope'
  | 'arrow-up-right'
  | 'chevron-right'
  | 'x'
  | 'user-heart'
  | 'user-plus'
  | 'shield-check'
  | 'brand-whatsapp'
  | 'brand-instagram'
  | 'brand-facebook'
  | 'brand-linkedin';
@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrl: './app-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class AppIconComponent {
  readonly name = input.required<IconName>();
}
