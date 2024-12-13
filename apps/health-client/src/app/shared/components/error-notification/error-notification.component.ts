import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'health-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonNote],
})
export class ErrorNotificationComponent {
  errorNotificationProps = input<string>();
}
