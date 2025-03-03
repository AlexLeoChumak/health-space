import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
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

import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import {
  FormValidationErrorMessagesInterface,
  FORM_VALIDATION_ERROR_MESSAGES,
} from 'src/app/shared/constants';
import { PhonePrefixFormatterDirective } from 'src/app/shared/directives';
import { checkInputValidatorUtility } from 'src/app/shared/utilities';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUserSectionData } from 'src/app/store/user';

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
  private readonly store = inject(Store);
  public readonly formReady = output<FormGroup>();
  public mobilePhoneNumberPasswordInfoFormGroup!: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  protected isEditableUserInfo = signal(false);
  protected readonly formValidationErrorMessages: FormValidationErrorMessagesInterface =
    FORM_VALIDATION_ERROR_MESSAGES;

  public ngOnInit(): void {
    this.initializeForm();
    this.updateFormValuesForEdit();
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

  private updateFormValuesForEdit(): void {
    this.store
      .select(selectUserSectionData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (
          data &&
          data.childObj &&
          typeof data.childObj === 'object' &&
          this.mobilePhoneNumberPasswordInfoFormGroup
        ) {
          this.isEditableUserInfo.set(true);
          this.mobilePhoneNumberPasswordInfoFormGroup.removeControl('password');
          this.mobilePhoneNumberPasswordInfoFormGroup.patchValue(data.childObj);
        }
      });
  }

  protected checkInputValidator(
    formGroup: FormGroup,
    controlName: string,
    validator: string
  ): boolean {
    return checkInputValidatorUtility(formGroup, controlName, validator);
  }
}
