import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonNote,
  IonItemGroup,
  IonRadio,
  IonRadioGroup,
  IonThumbnail,
  IonImg,
  IonIcon,
} from '@ionic/angular/standalone';
import { trashBin } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import {
  FormValidationErrorMessagesInterface,
  FORM_VALIDATION_ERROR_MESSAGES,
} from 'src/app/features/auth/constants/form-validation-error-messages.constant';
import {
  ActionButtonComponent,
  LabelButtonType,
} from 'src/app/shared/components/action-button/action-button.component';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { checkInputValidatorUtility } from 'src/app/shared/utils/check-input-validator.utility';
import { formattingDateToLocalStringUtility } from 'src/app/shared/utils/formatting-date-to-local-string.utility';
import { getDatepickerButtonLabelUtility } from 'src/app/shared/utils/get-datepicker-button-label.utility';

@Component({
  selector: 'health-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonRadioGroup,
    IonRadio,
    IonItemGroup,
    IonNote,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonThumbnail,
    IonImg,
    DatepickerComponent,
    ActionButtonComponent,
    ErrorNotificationComponent,
  ],
})
export class PersonalInfoFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  protected readonly formReady = output<FormGroup>();
  protected personalInfoFormGroup!: FormGroup;
  protected readonly isDatepickerOpen = signal<boolean>(false);
  protected readonly isImageType = signal<boolean>(true);
  protected readonly photoPreviewUrl = signal<string | ArrayBuffer | null>(
    null
  );
  protected readonly formValidationErrorMessages: FormValidationErrorMessagesInterface =
    FORM_VALIDATION_ERROR_MESSAGES;

  constructor() {
    addIcons({ trashBin });
  }

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.personalInfoFormGroup = new FormGroup({
      lastName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      middleName: new FormControl(null),
      dateOfBirth: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^([0-9]{1,2}) (января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря) [0-9]{4} г.$'
        ),
      ]),
      gender: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
    });

    this.formReady.emit(this.personalInfoFormGroup);
  }

  protected onClickFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
    this.setErrorRequiredTrueForPhotoControl();
  }

  private setErrorRequiredTrueForPhotoControl(): void {
    const photoControl = this.personalInfoFormGroup.get('photo');

    if (!photoControl?.value) {
      photoControl?.setErrors({ required: true });
      photoControl?.markAsTouched();
      photoControl?.updateValueAndValidity();
    }
  }

  private clearErrorRequiredTrueForPhotoControl(
    photoControl: AbstractControl | null
  ): void {
    if (photoControl) {
      photoControl.setErrors(null);
      photoControl.markAsTouched();
      photoControl.updateValueAndValidity();
    }
  }

  protected onPhotoUpload(event: Event): void {
    console.log('event', event);

    const input = event.target as HTMLInputElement;
    const photoControl = this.personalInfoFormGroup.get('photo');

    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.isImageType.set(false);
        return;
      } else {
        this.isImageType.set(true);
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreviewUrl.set(reader.result);
      };
      reader.readAsDataURL(file);

      this.personalInfoFormGroup.patchValue({
        photo: file,
      });

      this.clearErrorRequiredTrueForPhotoControl(photoControl);
    } else {
      this.setErrorRequiredTrueForPhotoControl();
    }
  }

  protected removePhoto(): void {
    this.photoPreviewUrl.set(null);
    this.personalInfoFormGroup.get('photo')?.reset();
    this.fileInput.nativeElement.value = '';
  }

  protected toggleDatepicker(): void {
    this.isDatepickerOpen.update((prevValue) => !prevValue);
  }

  protected get datepickerButtonLabel(): LabelButtonType {
    return getDatepickerButtonLabelUtility(this.isDatepickerOpen());
  }

  protected onDateChange(date: string): void {
    const formattedBirthDate = formattingDateToLocalStringUtility(date);

    this.personalInfoFormGroup.patchValue({
      dateOfBirth: formattedBirthDate,
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
