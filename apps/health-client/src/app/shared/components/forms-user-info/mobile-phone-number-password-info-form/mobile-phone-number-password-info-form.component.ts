import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonNote,
} from '@ionic/angular/standalone';

import {
  FormValidationErrorMessagesInterface,
  FORM_VALIDATION_ERROR_MESSAGES,
} from 'src/app/shared/constants/form-validation-error-messages.constant';
import { checkInputValidatorUtility } from 'src/app/shared/utilities/check-input-validator.utility';
import { PhonePrefixFormatterDirective } from 'src/app/features/auth/directives/phone-prefix-formatter.directive';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';

@Component({
  selector: 'health-mobile-phone-number-password-info-form',
  templateUrl: './mobile-phone-number-password-info-form.component.html',
  styleUrls: ['./mobile-phone-number-password-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonItemGroup,
    IonNote,
    IonItem,
    IonLabel,
    IonInput,
    ErrorNotificationComponent,
    PhonePrefixFormatterDirective,
  ],
})
export class MobilePhoneNumberPasswordInfoFormComponent implements OnInit {
  public readonly formReady = output<FormGroup>();
  public mobilePhoneNumberPasswordInfoFormGroup!: FormGroup;
  protected readonly formValidationErrorMessages: FormValidationErrorMessagesInterface =
    FORM_VALIDATION_ERROR_MESSAGES;

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const mobilePhoneNumberMinLength = 17;
    const passwordMinLength = 8;

    this.mobilePhoneNumberPasswordInfoFormGroup = new FormGroup({
      mobilePhoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(mobilePhoneNumberMinLength),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(passwordMinLength),
      ]),
    });

    this.formReady.emit(this.mobilePhoneNumberPasswordInfoFormGroup);
  }

  protected checkInputValidator(
    formGroup: FormGroup,
    controlName: string,
    validator: string
  ): boolean {
    return checkInputValidatorUtility(formGroup, controlName, validator);
  }
}
