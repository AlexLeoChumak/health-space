import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
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
} from '@ionic/angular/standalone';
import {
  FormValidationErrorMessagesInterface,
  FORM_VALIDATION_ERROR_MESSAGES,
} from 'src/app/shared/constants/form-validation-error-messages.constant';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { checkInputValidatorUtility } from 'src/app/shared/utilities/check-input-validator.utility';

@Component({
  selector: 'health-identification-info-form-for-foreign-citizens',
  templateUrl: './identification-info-form-for-foreign-citizens.component.html',
  styleUrls: ['./identification-info-form-for-foreign-citizens.component.scss'],
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
export class IdentificationInfoFormForForeignCitizensComponent
  implements OnInit
{
  protected readonly formControls = output<Record<string, FormControl>>();
  protected controls!: Record<string, FormControl>;
  protected readonly formValidationErrorMessages: FormValidationErrorMessagesInterface =
    FORM_VALIDATION_ERROR_MESSAGES;

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.controls = {
      nameStateForeignCitizen: new FormControl(null, [Validators.required]),
      documentName: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required]),
      nameInsuranceCompany: new FormControl(null, [Validators.required]),
      healthInsuranceContractNumber: new FormControl(null, [
        Validators.required,
      ]),
    };

    this.formControls.emit(this.controls);
  }

  protected checkInputValidator(
    controlName: string,
    validator: string
  ): boolean {
    return checkInputValidatorUtility(this.controls, controlName, validator);
  }
}
