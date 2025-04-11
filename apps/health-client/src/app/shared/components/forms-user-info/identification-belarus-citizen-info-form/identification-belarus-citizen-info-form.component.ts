import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { Store } from '@ngrx/store';

import {
  ActionButtonComponent,
  LabelButtonType,
} from 'src/app/shared/components/action-button/action-button.component';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { FORM_VALIDATION_CONSTANT } from 'src/app/shared/constants';
import {
  getDatepickerButtonLabelUtil,
  formattingDateToLocalStringUtil,
  checkInputValidatorUtil,
} from 'src/app/shared/utils';
import { selectUserInfoGroup } from 'src/app/store/user';

@Component({
    selector: 'health-identification-belarus-citizen-info-form',
    templateUrl: './identification-belarus-citizen-info-form.component.html',
    styleUrls: ['./identification-belarus-citizen-info-form.component.scss'],
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
    ]
})
export class IdentificationBelarusCitizenInfoFormComponent implements OnInit {
  private readonly store = inject(Store);
  protected readonly formReady = output<FormGroup>();
  protected identificationBelarusCitizenInfoFormGroup!: FormGroup;
  protected readonly isDatepickerOpen = signal<boolean>(false);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly FORM_VALIDATION_CONSTANT = FORM_VALIDATION_CONSTANT;

  public ngOnInit(): void {
    this.initializeForm();
    this.updateFormValuesForEdit();
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
    return getDatepickerButtonLabelUtil(this.isDatepickerOpen());
  }

  protected onDateChange(date: string): void {
    const formattedPassportIssueDate = formattingDateToLocalStringUtil(date);

    this.identificationBelarusCitizenInfoFormGroup.patchValue({
      passportIssueDate: formattedPassportIssueDate,
    });
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
          this.identificationBelarusCitizenInfoFormGroup
        ) {
          this.identificationBelarusCitizenInfoFormGroup.patchValue(
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
    return checkInputValidatorUtil(formGroup, controlName, validator);
  }
}
