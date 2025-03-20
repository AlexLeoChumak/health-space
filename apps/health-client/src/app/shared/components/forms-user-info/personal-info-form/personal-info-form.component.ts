import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
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
  IonText,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  ActionButtonComponent,
  LabelButtonType,
} from 'src/app/shared/components/action-button/action-button.component';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import {
  getDatepickerButtonLabelUtil,
  formattingDateToLocalStringUtil,
  checkInputValidatorUtil,
} from 'src/app/shared/utils';
import {
  selectUrlUserPhoto,
  selectUser,
  selectUserInfoGroup,
} from 'src/app/store/user';
import { FORM_VALIDATION_CONSTANT } from 'src/app/shared/constants';
import { selectIsLoading } from 'src/app/store/app';

@Component({
  selector: 'health-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonSkeletonText,
    IonText,
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
  public readonly editableInfoProps = input.required();
  private readonly store = inject(Store);
  private readonly user = this.store.selectSignal(selectUser);
  protected readonly urlUserPhoto = this.store.selectSignal(selectUrlUserPhoto);
  protected readonly isLoading = this.store.selectSignal(selectIsLoading);
  protected readonly formReady = output<FormGroup>();
  protected personalInfoFormGroup!: FormGroup;
  protected readonly isDatepickerOpen = signal(false);
  protected readonly isImageType = signal(true);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly FORM_VALIDATION_CONSTANT = FORM_VALIDATION_CONSTANT;
  protected readonly userPhotoPreview = signal<string | ArrayBuffer | null>(
    null
  );
  protected readonly isUserPhotoPreview = signal(false);
  private readonly dateOfBirthPattern: string =
    '^([0-9]{1,2}) (января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря) [0-9]{4} г.$';

  public ngOnInit(): void {
    this.initializeForm();
    this.updateFormValuesForEdit();
  }

  private initializeForm(): void {
    this.personalInfoFormGroup = new FormGroup({
      lastName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      middleName: new FormControl(null),
      dateOfBirth: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.dateOfBirthPattern),
      ]),
      gender: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
    });

    this.formReady.emit(this.personalInfoFormGroup);
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
          this.personalInfoFormGroup
        ) {
          this.personalInfoFormGroup.patchValue(data.userInfoGroupData);

          if (typeof this.userPhotoPreview() === 'string') {
            this.isUserPhotoPreview.set(true);
          }
        }
      });
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
    this.isUserPhotoPreview.set(false);
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
        this.userPhotoPreview.set(reader.result);
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
    this.userPhotoPreview.set(null);
    this.fileInput.nativeElement.value = '';

    if (this.editableInfoProps()) {
      this.personalInfoFormGroup.patchValue({
        photo: this.user()?.personalInfo.photo,
      });
    } else {
      this.personalInfoFormGroup.get('photo')?.reset();
    }
  }

  protected toggleDatepicker(): void {
    this.isDatepickerOpen.update((prevValue) => !prevValue);
  }

  protected get datepickerButtonLabel(): LabelButtonType {
    return getDatepickerButtonLabelUtil(this.isDatepickerOpen());
  }

  protected onDateChange(date: string): void {
    const formattedBirthDate = formattingDateToLocalStringUtil(date);

    this.personalInfoFormGroup.patchValue({
      dateOfBirth: formattedBirthDate,
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
