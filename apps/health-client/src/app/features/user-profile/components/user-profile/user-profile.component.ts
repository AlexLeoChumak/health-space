import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { Observable, Subscription } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { UserState, selectUser } from 'src/app/store/user';
import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';
import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';
import { logout } from 'src/app/store/app';

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
    LetDirective,
  ],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store<UserState>);
  protected user$!: Observable<PatientInterface | DoctorInterface | null>;
  private errorSubscription!: Subscription;

  public ngOnInit(): void {
    this.subscribeToUserState();
  }

  private subscribeToUserState(): void {
    this.user$ = this.store.select(selectUser);
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  public ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }
}
