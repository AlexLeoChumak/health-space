import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonItem,
  IonItemGroup,
  IonLabel,
  IonInput,
  IonNote,
  IonIcon,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import {
  ActionButtonComponent,
  ErrorNotificationComponent,
} from 'src/app/shared/components';
import { checkInputValidatorUtil, getUserRoleUtil } from 'src/app/shared/utils';
import {
  UPDATE_INFO_CONSTANT,
  UpdatePasswordFormInterface,
  UpdatePasswordInterface,
} from 'src/app/features/user-profile';
import { selectUser } from 'src/app/store/user';
import { ToastService } from 'src/app/shared/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { setLoading } from 'src/app/store/app';

import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FORM_VALIDATION_CONSTANT,
  SHARED_CONSTANT,
} from 'src/app/shared/constants';
import { UpdateUserProfileService } from 'src/app/features/user-profile/service/update-user-profile/update-user-profile.service';

type PasswordType = 'oldPassword' | 'newPassword' | 'newPasswordConfirmation';

@Component({
  selector: 'health-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    CommonModule,
    ReactiveFormsModule,
    IonNote,
    IonInput,
    IonLabel,
    IonItemGroup,
    IonItem,
    ErrorNotificationComponent,
    ActionButtonComponent,
  ],
})
export class UpdatePasswordFormComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly updateUserProfileService = inject(UpdateUserProfileService);
  private readonly toastService = inject(ToastService);
  private readonly store = inject(Store);
  private readonly user = this.store.selectSignal(selectUser);
  protected readonly isSubmittingForm = signal(false);
  public updatePasswordInfoFormGroup!: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  protected readonly FORM_VALIDATION_CONSTANT = FORM_VALIDATION_CONSTANT;
  protected isPasswordVisible = signal({
    oldPassword: false,
    newPassword: false,
    newPasswordConfirmation: false,
  });

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const passwordMinLength = 8;

    this.updatePasswordInfoFormGroup = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(passwordMinLength),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(passwordMinLength),
      ]),
      newPasswordConfirmation: new FormControl(null, [
        Validators.required,
        Validators.minLength(passwordMinLength),
      ]),
    });
  }

  protected onSubmitUpdatePassword(): void {
    if (this.updatePasswordInfoFormGroup.invalid) return;
    this.isSubmittingForm.set(true);

    const updatePasswords: UpdatePasswordInterface =
      this.updatePasswordInfoFormGroup.value;

    if (
      updatePasswords.newPassword !== updatePasswords.newPasswordConfirmation
    ) {
      this.toastService.presentToast(UPDATE_INFO_CONSTANT.PASSWORDS_NO_MATCH);
      this.isSubmittingForm.set(false);
      return;
    }

    this.store.dispatch(setLoading({ isLoading: true }));

    const user = this.user();

    if (!user) {
      this.toastService.presentToast(SHARED_CONSTANT.USER_NOT_FOUND_ERROR);
      this.isSubmittingForm.set(false);
      this.store.dispatch(setLoading({ isLoading: false }));
      return;
    }

    const userId = user.id;
    const userRole = getUserRoleUtil(user);

    if (!userId || !userRole) {
      this.toastService.presentToast(SHARED_CONSTANT.USER_NOT_FOUND_ERROR);
      this.isSubmittingForm.set(false);
      this.store.dispatch(setLoading({ isLoading: false }));
      return;
    }

    const updateData: UpdatePasswordFormInterface = {
      ...updatePasswords,
      userId,
      userRole,
    };

    this.updateUserProfileService
      .updatePassword(updateData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastService.presentToast(error.error.message);
          this.store.dispatch(setLoading({ isLoading: false }));
          this.isSubmittingForm.set(false);
          return throwError(() => error);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((success) => {
        this.router.navigate(['/user-profile']);
        this.toastService.presentToast(success.data);
        this.store.dispatch(setLoading({ isLoading: false }));
        this.updatePasswordInfoFormGroup.reset();
        this.isSubmittingForm.set(false);
      });
  }

  togglePasswordVisibility(field: PasswordType): void {
    this.isPasswordVisible.update((state) => ({
      ...state,
      [field]: !state[field],
    }));
  }

  protected checkInputValidator(
    formGroup: FormGroup,
    controlName: string,
    validator: string,
  ): boolean {
    return checkInputValidatorUtil(formGroup, controlName, validator);
  }
}
