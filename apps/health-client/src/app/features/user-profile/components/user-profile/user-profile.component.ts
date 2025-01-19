import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
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
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { UserState, selectUser } from 'src/app/store/user';
import { logout } from 'src/app/store/app';
import { BackblazeService } from 'src/app/shared/services/backblaze/backblaze.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { GlobalApiSuccessResponseInterface } from 'src/app/shared/models/global-api-success-response.interface';

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
  private readonly backblazeService = inject(BackblazeService);
  protected readonly user$ = this.store.select(selectUser);
  private readonly defaultProfileImage = 'default-profile-image.png';
  protected readonly userPhotoUrl = signal(this.defaultProfileImage);
  private readonly destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.initializeUserInfo();
  }

  private initializeUserInfo() {
    this.user$
      .pipe(
        filter(Boolean),
        switchMap((user) => {
          const fileName = user?.personalInfo?.photo as string;

          return this.backblazeService.authorize().pipe(
            switchMap(() => {
              return this.backblazeService.getPrivatePhotoUrl(fileName);
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((response: GlobalApiSuccessResponseInterface<string>) => {
        this.userPhotoUrl.set(response.data);
      });
  }

  protected onLogout() {
    this.store.dispatch(logout());
    this.userPhotoUrl.set(this.defaultProfileImage);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
