import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {
  IonItemGroup,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
} from '@ionic/angular/standalone';
import { ChildObjChildNameInterface } from 'src/app/features/user-profile';

import {
  ActionButtonComponent,
  LabelButtonType,
} from 'src/app/shared/components/action-button/action-button.component';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import {
  FormValidationErrorMessagesInterface,
  FORM_VALIDATION_ERROR_MESSAGES,
} from 'src/app/shared/constants';
import {
  getDatepickerButtonLabelUtility,
  formattingDateToLocalStringUtility,
  checkInputValidatorUtility,
} from 'src/app/shared/utilities';

@Component({
  selector: 'health-identification-belarus-citizen-info-form',
  templateUrl: './identification-belarus-citizen-info-form.component.html',
  styleUrls: ['./identification-belarus-citizen-info-form.component.scss'],
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
export class IdentificationBelarusCitizenInfoFormComponent implements OnInit {
  public readonly formDataProps = input<ChildObjChildNameInterface | null>();
  protected readonly formReady = output<FormGroup>();
  protected identificationBelarusCitizenInfoFormGroup!: FormGroup;
  protected readonly isDatepickerOpen = signal<boolean>(false);
  protected readonly formValidationErrorMessages: FormValidationErrorMessagesInterface =
    FORM_VALIDATION_ERROR_MESSAGES;

  public ngOnInit(): void {
    this.initializeForm();
    console.log(2);
  }

  private initializeForm(): void {
    this.identificationBelarusCitizenInfoFormGroup = new FormGroup({
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
    });

    this.formReady.emit(this.identificationBelarusCitizenInfoFormGroup);
  }

  protected toggleDatepicker(): void {
    this.isDatepickerOpen.update((prevValue) => !prevValue);
  }

  protected get datepickerButtonLabel(): LabelButtonType {
    return getDatepickerButtonLabelUtility(this.isDatepickerOpen());
  }

  protected onDateChange(date: string): void {
    const formattedPassportIssueDate = formattingDateToLocalStringUtility(date);

    this.identificationBelarusCitizenInfoFormGroup.patchValue({
      passportIssueDate: formattedPassportIssueDate,
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
