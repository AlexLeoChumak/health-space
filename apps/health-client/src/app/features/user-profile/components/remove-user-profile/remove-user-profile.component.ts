import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'health-remove-user-profile',
  templateUrl: './remove-user-profile.component.html',
  styleUrl: './remove-user-profile.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class RemoveUserProfileComponent {}
