import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { selectIsAuthenticated } from 'src/app/store/app';
import { BurgerMenuComponent } from 'src/app/features/header/components/burger-menu/burger-menu.component';

@Component({
  selector: 'health-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, RouterModule, IonHeader, IonToolbar, BurgerMenuComponent],
})
export class HeaderComponent {
  private readonly store = inject(Store);
  protected readonly isAuthenticated = this.store.selectSignal(
    selectIsAuthenticated
  );
}
