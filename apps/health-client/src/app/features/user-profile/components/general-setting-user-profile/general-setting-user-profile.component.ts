import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'health-general-setting-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-setting-user-profile.component.html',
  styleUrl: './general-setting-user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingUserProfileComponent {}
