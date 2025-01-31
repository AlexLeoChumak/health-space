import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';
import { selectIsAuthenticated } from 'src/app/store/app';

@Component({
  selector: 'health-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    ActionButtonComponent,
  ],
})
export class HeaderComponent {
  private readonly store = inject(Store);
  protected readonly isAuthenticated = this.store.selectSignal(
    selectIsAuthenticated
  );
}
