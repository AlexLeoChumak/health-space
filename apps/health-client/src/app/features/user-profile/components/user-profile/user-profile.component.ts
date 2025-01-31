import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  IonFooter,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { selectUrlUserPhoto, selectUser } from 'src/app/store/user';
import { logout } from 'src/app/store/app';
import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';

@Component({
  selector: 'health-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    IonFooter,
    IonCard,
    IonItem,
    IonLabel,
    IonAvatar,
    ActionButtonComponent,
  ],
})
export class UserProfileComponent {
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly urlUserPhoto = this.store.selectSignal(selectUrlUserPhoto);

  protected onLogout() {
    this.store.dispatch(logout());
  }
}
