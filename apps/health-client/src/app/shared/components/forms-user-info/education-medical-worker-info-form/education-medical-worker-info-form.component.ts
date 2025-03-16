import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { Store } from '@ngrx/store';
import { checkInputValidatorUtility } from 'src/app/shared/utilities';
import { selectUserSectionData } from 'src/app/store/user';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { FORM_VALIDATION_CONSTANT } from 'src/app/shared/constants';

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
  private readonly store = inject(Store);
  public readonly formReady = output<FormGroup>();
  public educationMedicalWorkerInfoFormGroup!: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  protected readonly FORM_VALIDATION_CONSTANT = FORM_VALIDATION_CONSTANT;

  public ngOnInit(): void {
    this.initializeForm();
    this.updateFormValuesForEdit();
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

  private updateFormValuesForEdit(): void {
    this.store
      .select(selectUserSectionData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (
          data &&
          data.userInfoGroup &&
          typeof data.userInfoGroup === 'object' &&
          this.educationMedicalWorkerInfoFormGroup
        ) {
          this.educationMedicalWorkerInfoFormGroup.patchValue(
            data.userInfoGroup
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
