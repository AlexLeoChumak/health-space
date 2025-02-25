import {
  ChangeDetectionStrategy,
  Component,
  input,
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
import { ChildObjChildNameInterface } from 'src/app/features/user-profile/models/child-obj-child-name.interface';

import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import {
  FormValidationErrorMessagesInterface,
  FORM_VALIDATION_ERROR_MESSAGES,
} from 'src/app/shared/constants';
import { checkInputValidatorUtility } from 'src/app/shared/utilities';

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
  public readonly formDataProps = input<ChildObjChildNameInterface | null>();
  protected readonly formReady = output<FormGroup>();
  protected identificationForeignCitizenInfoFormGroup!: FormGroup;
  protected readonly formValidationErrorMessages: FormValidationErrorMessagesInterface =
    FORM_VALIDATION_ERROR_MESSAGES;

  public ngOnInit(): void {
    this.initializeForm();
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

  protected checkInputValidator(
    formGroup: FormGroup,
    controlName: string,
    validator: string
  ): boolean {
    return checkInputValidatorUtility(formGroup, controlName, validator);
  }
}
