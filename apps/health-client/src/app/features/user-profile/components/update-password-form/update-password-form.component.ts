import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
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
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { ErrorNotificationComponent } from 'src/app/shared/components';
import {
  checkInputValidatorUtility,
  getUserRole,
} from 'src/app/shared/utilities';
import {
  FormValidationErrorMessagesInterface,
  FORM_VALIDATION_ERROR_MESSAGES,
} from 'src/app/shared/constants';
import {
  PASSWORD_CONSTANT,
  UpdatePasswordFormInterface,
  UpdatePasswordInterface,
} from 'src/app/features/user-profile';
import { selectUser } from 'src/app/store/user';
import { ToastService } from 'src/app/shared/services';
import { UpdatePasswordService } from 'src/app/features/user-profile/service/update-password/update-password.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'health-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    IonButton,
    CommonModule,
    ReactiveFormsModule,
    IonNote,
    IonInput,
    IonLabel,
    IonItemGroup,
    IonItem,
    ErrorNotificationComponent,
  ],
})
export class UpdatePasswordFormComponent implements OnInit {
  private readonly updatePasswordService = inject(UpdatePasswordService);
  private readonly toastService = inject(ToastService);
  private readonly store = inject(Store);
  private readonly user = this.store.selectSignal(selectUser);
  public updatePasswordInfoFormGroup!: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  protected readonly formValidationErrorMessages: FormValidationErrorMessagesInterface =
    FORM_VALIDATION_ERROR_MESSAGES;

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

    const updatePasswords: UpdatePasswordInterface =
      this.updatePasswordInfoFormGroup.value;

    if (
      updatePasswords.newPassword !== updatePasswords.newPasswordConfirmation
    ) {
      this.toastService.presentToast(PASSWORD_CONSTANT.passwordsNoMatch);
      return;
    }

    const user = this.user();

    if (user) {
      const userId = user.id;
      const userRole = getUserRole(user);

      if (userId && userRole) {
        const updateData: UpdatePasswordFormInterface = {
          ...updatePasswords,
          userId,
          userRole,
        };

        this.updatePasswordService
          .updatePassword(updateData)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((response) => {
            this.toastService.presentToast(response.data);
          });
      }
    }
  }

  protected checkInputValidator(
    formGroup: FormGroup,
    controlName: string,
    validator: string
  ): boolean {
    return checkInputValidatorUtility(formGroup, controlName, validator);
  }
}
