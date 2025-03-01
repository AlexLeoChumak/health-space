import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

import { ErrorNotificationComponent } from 'src/app/shared/components';
import { checkInputValidatorUtility } from 'src/app/shared/utilities';
import {
  FormValidationErrorMessagesInterface,
  FORM_VALIDATION_ERROR_MESSAGES,
} from 'src/app/shared/constants';

@Component({
  selector: 'health-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss',
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
export class ChangePasswordFormComponent implements OnInit {
  public changePasswordInfoFormGroup!: FormGroup;
  protected readonly formValidationErrorMessages: FormValidationErrorMessagesInterface =
    FORM_VALIDATION_ERROR_MESSAGES;

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const passwordMinLength = 8;

    this.changePasswordInfoFormGroup = new FormGroup({
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

  protected onSubmitChangedPassword(): void {
    if (this.changePasswordInfoFormGroup.valid) {
      const updatedData = this.changePasswordInfoFormGroup.value;
      console.log('Пароль для сохранения:', updatedData);
      // Здесь можно отправить данные на сервер для сохранения
    } else {
      console.log('Форма содержит ошибки');
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
