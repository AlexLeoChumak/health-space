import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'health-general-setting-user-profile',
  templateUrl: './general-setting-user-profile.component.html',
  styleUrl: './general-setting-user-profile.component.scss',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingUserProfileComponent {}
