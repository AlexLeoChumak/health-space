import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { logout, selectIsAuthenticated } from 'src/app/store/app';

@Component({
    selector: 'health-burger-menu',
    templateUrl: './burger-menu.component.html',
    styleUrl: './burger-menu.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonButton, IonItem, IonList, IonPopover, IonIcon, CommonModule]
})
export class BurgerMenuComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  protected readonly isAuth = this.store.selectSignal(selectIsAuthenticated);
  protected isPopoverOpen = false;
  protected popoverEvent!: Event | null;

  protected openPopover(event: Event): void {
    this.popoverEvent = event;
    this.isPopoverOpen = true;
  }

  protected closePopover(): void {
    this.isPopoverOpen = false;
  }

  protected navigateToUserProfile(): void {
    this.router.navigate(['/user-profile']);
    this.closePopover();
  }

  protected navigateToUserSettings(): void {
    this.router.navigate(['/user-profile/settings/general']);
    this.closePopover();
  }

  protected onLogout(): void {
    this.store.dispatch(logout());
    this.closePopover();
  }
}
