import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonItemGroup,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
} from '@ionic/angular/standalone';
import {
  FormValidationErrorMessagesInterface,
  FORM_VALIDATION_ERROR_MESSAGES,
} from 'src/app/shared/constants/form-validation-error-messages.constant';
import {
  ActionButtonComponent,
  LabelButtonType,
} from 'src/app/shared/components/action-button/action-button.component';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { checkInputValidatorUtility } from 'src/app/shared/utilities/check-input-validator.utility';
import { formattingDateToLocalStringUtility } from 'src/app/shared/utilities/formatting-date-to-local-string.utility';
import { getDatepickerButtonLabelUtility } from 'src/app/shared/utilities/get-datepicker-button-label.utility';

@Component({
  selector: 'health-identification-info-form-for-citizens-belarus',
  templateUrl: './identification-info-form-for-citizens-belarus.component.html',
  styleUrls: ['./identification-info-form-for-citizens-belarus.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonItemGroup,
    IonItem,
    IonLabel,
    IonInput,
    IonNote,
    DatepickerComponent,
    ActionButtonComponent,
    ErrorNotificationComponent,
  ],
})
export class IdentificationInfoFormForCitizensBelarusComponent
  implements OnInit
{
  protected readonly formControls = output<Record<string, FormControl>>();
  protected controls!: Record<string, FormControl>;
  protected readonly isDatepickerOpen = signal<boolean>(false);
  protected readonly formValidationErrorMessages: FormValidationErrorMessagesInterface =
    FORM_VALIDATION_ERROR_MESSAGES;

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.controls = {
      personalIdentificationNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14),
      ]),
      passportSeriesNumber: new FormControl(null, [Validators.required]),
      passportIssueDate: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^([0-9]{1,2}) (января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря) [0-9]{4} г.$'
        ),
      ]),
      passportIssuingAuthority: new FormControl(null, [Validators.required]),
    };

    this.formControls.emit(this.controls);
  }

  protected toggleDatepicker(): void {
    this.isDatepickerOpen.update((prevValue) => !prevValue);
  }

  protected get datepickerButtonLabel(): LabelButtonType {
    return getDatepickerButtonLabelUtility(this.isDatepickerOpen());
  }

  protected onDateChange(date: string): void {
    const formattedPassportIssueDate = formattingDateToLocalStringUtility(date);
    this.controls['passportIssueDate'].setValue(formattedPassportIssueDate);
  }

  protected checkInputValidator(
    controlName: string,
    validator: string
  ): boolean {
    return checkInputValidatorUtility(this.controls, controlName, validator);
  }
}
