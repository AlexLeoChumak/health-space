import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { selectIsAuthenticated } from 'src/app/store/app';

@Component({
  selector: 'health-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, RouterModule, IonHeader, IonToolbar],
})
export class HeaderComponent {
  private readonly store = inject(Store);
  protected readonly isAuthenticated = this.store.selectSignal(
    selectIsAuthenticated
  );
}
