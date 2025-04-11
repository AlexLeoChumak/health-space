import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertController } from '@ionic/angular';
import { IonItem, IonContent, IonLabel } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { selectUser, selectUserRole } from 'src/app/store/user';
import { ActionButtonComponent } from 'src/app/shared/components';
import { UpdateUserProfileService } from 'src/app/features/user-profile/service/update-user-profile/update-user-profile.service';
import { ToastService } from 'src/app/shared/services';
import { AuthService } from 'src/app/features/auth/services/auth/auth.service';
import { from, tap, switchMap, of, catchError } from 'rxjs';
import { SHARED_CONSTANT } from 'src/app/shared/constants';
import { GlobalApiSuccessResponseInterface } from 'src/app/shared/models';
import { logout } from 'src/app/store/app';

@Component({
    selector: 'health-remove-user-profile',
    templateUrl: './remove-user-profile.component.html',
    styleUrl: './remove-user-profile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonLabel, IonContent, IonItem, CommonModule, ActionButtonComponent]
})
export class RemoveUserProfileComponent {
  private readonly store = inject(Store);
  private readonly user = this.store.selectSignal(selectUser);
  private readonly userType = this.store.selectSignal(selectUserRole);
  private readonly updateUserProfileService = inject(UpdateUserProfileService);
  private readonly authService = inject(AuthService);
  private readonly alertController = inject(AlertController);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  protected removeUser(): void {
    const userType = this.userType();
    const userId = this.user()?.id;

    if (userId && userType) {
      this.updateUserProfileService
        .removeUser(userType, userId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((response: GlobalApiSuccessResponseInterface<string>) => {
          this.store.dispatch(logout());
          this.toastService.presentToast(response.data);
        });
    }
  }

  protected confirmRemoveUser(): void {
    from(
      this.alertController.create({
        header: 'Удалить профиль?',
        message: 'Для подтверждения удаления введите пароль:',
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'пароль',
          },
        ],
        buttons: [
          {
            text: 'отмена',
            role: 'cancel',
          },
          {
            text: 'удалить',
            role: 'destructive',
            handler: (data) => {
              const password = data.password;
              const userId = this.user()?.id;
              const userType = this.userType();

              if (!password || !userType || typeof userId !== 'string') {
                this.toastService.presentToast(SHARED_CONSTANT.ENTER_PASSWORD);
                return false;
              }

              this.authService
                .verifyPassword(password, userId, userType)
                .pipe(
                  switchMap((isValid) => {
                    if (isValid) {
                      this.removeUser();
                      this.alertController.dismiss();
                      return of(true);
                    } else {
                      this.toastService.presentToast(
                        SHARED_CONSTANT.INCORRECT_PASSWORD
                      );
                      return of(false);
                    }
                  }),
                  catchError(() => {
                    this.toastService.presentToast(
                      SHARED_CONSTANT.PASSWORD_VERIFICATION_ERROR
                    );
                    return of(false);
                  }),
                  takeUntilDestroyed(this.destroyRef)
                )
                .subscribe();

              return false;
            },
          },
        ],
      })
    )
      .pipe(
        tap((alert) => alert.present()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
