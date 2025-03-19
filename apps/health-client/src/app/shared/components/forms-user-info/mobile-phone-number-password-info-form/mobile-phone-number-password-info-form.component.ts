import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
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
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { PhonePrefixFormatterDirective } from 'src/app/shared/directives';
import { checkInputValidatorUtility } from 'src/app/shared/utilities';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUserInfoGroup } from 'src/app/store/user';
import { FORM_VALIDATION_CONSTANT } from 'src/app/shared/constants';

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
  public readonly editableInfoProps = input.required();
  private readonly store = inject(Store);
  public readonly formReady = output<FormGroup>();
  public mobilePhoneNumberPasswordInfoFormGroup!: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  protected readonly FORM_VALIDATION_CONSTANT = FORM_VALIDATION_CONSTANT;

  public ngOnInit(): void {
    this.initializeForm();
    this.updateFormValuesForEdit();
  }

  private initializeForm(): void {
    const mobilePhoneNumberMinLength = 17;
    const passwordMinLength = 8;

    if (!this.editableInfoProps()) {
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
    } else {
      this.mobilePhoneNumberPasswordInfoFormGroup = new FormGroup({
        mobilePhoneNumber: new FormControl(null, [
          Validators.required,
          Validators.minLength(mobilePhoneNumberMinLength),
        ]),
      });
    }

    this.formReady.emit(this.mobilePhoneNumberPasswordInfoFormGroup);
  }

  private updateFormValuesForEdit(): void {
    this.store
      .select(selectUserInfoGroup)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (
          data &&
          data.userInfoGroupData &&
          typeof data.userInfoGroupData === 'object' &&
          this.mobilePhoneNumberPasswordInfoFormGroup
        ) {
          this.mobilePhoneNumberPasswordInfoFormGroup.patchValue(
            data.userInfoGroupData
          );
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
