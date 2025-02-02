import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonAvatar,
  IonLabel,
  IonItem,
  IonCard,
  IonCardHeader,
  IonContent,
  IonCardContent,
  IonList,
  IonText,
  IonImg,
  IonCol,
  IonGrid,
  IonRow,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { logout } from 'src/app/store/app';
import { selectUrlUserPhoto, selectUser } from 'src/app/store/user';
import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';
import { AddressInfoCardComponent } from 'src/app/shared/components/cards-user-info/address-info-card/address-info-card.component';
import { getUserRole } from 'src/app/shared/utils/get-user-role.utility';

@Component({
  selector: 'health-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCardTitle,
    IonRow,
    IonGrid,
    IonCol,
    IonImg,
    CommonModule,
    IonText,
    IonList,
    IonCardContent,
    IonContent,
    IonCardHeader,
    IonCard,
    IonItem,
    IonLabel,
    IonAvatar,
    ActionButtonComponent,
    AddressInfoCardComponent,
  ],
})
export class UserProfileComponent {
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly urlUserPhoto = this.store.selectSignal(selectUrlUserPhoto);
  protected readonly userRole = computed(() => {
    const currentUser = this.user();
    return currentUser ? getUserRole(currentUser) : null;
  });

  protected onLogout() {
    this.store.dispatch(logout());
  }
}
