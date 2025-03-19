import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
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
} from '@ionic/angular/standalone';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { checkInputValidatorUtility } from 'src/app/shared/utilities';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUserInfoGroup } from 'src/app/store/user';
import { FORM_VALIDATION_CONSTANT } from 'src/app/shared/constants';

@Component({
  selector: 'health-identification-foreign-citizen-info-form',
  templateUrl: './identification-foreign-citizen-info-form.component.html',
  styleUrls: ['./identification-foreign-citizen-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonItemGroup,
    IonItem,
    IonLabel,
    IonInput,
    ErrorNotificationComponent,
  ],
})
export class IdentificationForeignCitizenInfoFormComponent implements OnInit {
  private readonly store = inject(Store);
  protected readonly formReady = output<FormGroup>();
  protected identificationForeignCitizenInfoFormGroup!: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  protected readonly FORM_VALIDATION_CONSTANT = FORM_VALIDATION_CONSTANT;

  public ngOnInit(): void {
    this.initializeForm();
    this.updateFormValuesForEdit();
  }

  private initializeForm(): void {
    this.identificationForeignCitizenInfoFormGroup = new FormGroup({
      nameStateForeignCitizen: new FormControl(null, [Validators.required]),
      documentName: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required]),
      nameInsuranceCompany: new FormControl(null, [Validators.required]),
      healthInsuranceContractNumber: new FormControl(null, [
        Validators.required,
      ]),
    });

    this.formReady.emit(this.identificationForeignCitizenInfoFormGroup);
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
          this.identificationForeignCitizenInfoFormGroup
        ) {
          this.identificationForeignCitizenInfoFormGroup.patchValue(
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
