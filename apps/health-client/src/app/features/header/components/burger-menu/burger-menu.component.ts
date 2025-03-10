import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { logout, selectIsAuthenticated } from 'src/app/store/app';

@Component({
  selector: 'health-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonItem, IonList, IonPopover, IonIcon, IonButton, CommonModule],
})
export class BurgerMenuComponent {
  private readonly store = inject(Store);
  protected readonly isAuth = this.store.selectSignal(selectIsAuthenticated);
  protected isPopoverOpen = false;
  protected popoverEvent!: Event;

  openPopover(event: Event) {
    this.popoverEvent = event;
    this.isPopoverOpen = true;
  }

  closePopover() {
    this.isPopoverOpen = false;
  }

  protected onLogout() {
    this.store.dispatch(logout());
    this.closePopover();
  }
}
