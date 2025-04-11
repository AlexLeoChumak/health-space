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
import { checkInputValidatorUtil } from 'src/app/shared/utils';
import { selectUserInfoGroup } from 'src/app/store/user';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { FORM_VALIDATION_CONSTANT } from 'src/app/shared/constants';

@Component({
    selector: 'health-education-medical-worker-info-form',
    templateUrl: './education-medical-worker-info-form.component.html',
    styleUrls: ['./education-medical-worker-info-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        IonItemGroup,
        IonItem,
        IonLabel,
        IonInput,
        ErrorNotificationComponent,
    ]
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
      .select(selectUserInfoGroup)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (
          data &&
          data.userInfoGroupData &&
          typeof data.userInfoGroupData === 'object' &&
          this.educationMedicalWorkerInfoFormGroup
        ) {
          this.educationMedicalWorkerInfoFormGroup.patchValue(
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
