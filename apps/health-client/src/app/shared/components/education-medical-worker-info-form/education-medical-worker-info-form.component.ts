import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonItemGroup,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';

import {
  FormValidationErrorMessagesInterface,
  FORM_VALIDATION_ERROR_MESSAGES,
} from 'src/app/features/auth/constants/form-validation-error-messages.constant';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { checkInputValidatorUtility } from 'src/app/shared/utils/check-input-validator.utility';

@Component({
  selector: 'health-education-medical-worker-info-form',
  templateUrl: './education-medical-worker-info-form.component.html',
  styleUrls: ['./education-medical-worker-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    IonItemGroup,
    IonItem,
    IonLabel,
    IonInput,
    ErrorNotificationComponent,
  ],
})
export class EducationMedicalWorkerInfoFormComponent implements OnInit {
  public readonly formReady = output<FormGroup>();
  public educationMedicalWorkerInfoFormGroup!: FormGroup;
  protected readonly formValidationErrorMessages: FormValidationErrorMessagesInterface =
    FORM_VALIDATION_ERROR_MESSAGES;

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.educationMedicalWorkerInfoFormGroup = new FormGroup({
      nameEducationalInstitution: new FormControl(null, [Validators.required]),
      faculty: new FormControl(null, [Validators.required]),
      speciality: new FormControl(null, [Validators.required]),
      numberDiplomaHigherMedicalEducation: new FormControl(null, [
        Validators.required,
      ]),
      specialization: new FormControl(null, [Validators.required]),
      specialistCertificateNumber: new FormControl(null, [Validators.required]),
      licenseNumberMedicalActivities: new FormControl(null, [
        Validators.required,
      ]),
    });

    this.formReady.emit(this.educationMedicalWorkerInfoFormGroup);
  }

  protected checkInputValidator(
    formGroup: FormGroup,
    controlName: string,
    validator: string
  ): boolean {
    return checkInputValidatorUtility(formGroup, controlName, validator);
  }
}
