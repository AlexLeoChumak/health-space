import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonAvatar,
  IonLabel,
  IonItem,
  IonCard,
  IonCardHeader,
  IonContent,
  IonCardContent,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { UserState, selectUrlUserPhoto, selectUser } from 'src/app/store/user';
import { logout } from 'src/app/store/app';

// import { LetDirective } from '@ngrx/component'; для ngrxLet и ngrxPush

@Component({
  selector: 'health-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonButton,
    IonToolbar,
    IonTitle,
    IonText,
    IonList,
    IonCardContent,
    IonContent,
    IonCardHeader,
    IonCard,
    IonItem,
    IonLabel,
    IonAvatar,
    IonHeader,
  ],
})
export class UserProfileComponent {
  private readonly store = inject(Store<UserState>);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly urlUserPhoto = this.store.selectSignal(selectUrlUserPhoto);

  protected onLogout() {
    this.store.dispatch(logout());
  }
}
