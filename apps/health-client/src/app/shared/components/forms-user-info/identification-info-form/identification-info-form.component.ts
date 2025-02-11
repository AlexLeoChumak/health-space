import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonItemGroup,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
} from '@ionic/angular/standalone';

import { IdentificationInfoFormForCitizensBelarusComponent } from 'src/app/shared/components/forms-user-info/identification-info-form/identification-info-form-for-citizens-belarus/identification-info-form-for-citizens-belarus.component';
import { IdentificationInfoFormForForeignCitizensComponent } from 'src/app/shared/components/forms-user-info/identification-info-form/identification-info-form-for-foreign-citizens/identification-info-form-for-foreign-citizens.component';

@Component({
  selector: 'health-identification-info-form',
  templateUrl: './identification-info-form.component.html',
  styleUrls: ['./identification-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonRadio,
    IonRadioGroup,
    IonItemGroup,
    IonItem,
    IonLabel,
    IdentificationInfoFormForForeignCitizensComponent,
    IdentificationInfoFormForCitizensBelarusComponent,
  ],
})
export class IdentificationInfoFormComponent implements OnInit {
  protected readonly formReady = output<FormGroup>();
  protected identificationInfoFormGroup!: FormGroup;
  protected readonly userCitizenshipSignal = signal<string>(
    'Республика Беларусь'
  );

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.identificationInfoFormGroup = new FormGroup({
      userCitizenship: new FormControl('Республика Беларусь', [
        Validators.required,
      ]),
    });

    this.formReady.emit(this.identificationInfoFormGroup);
  }

  protected updateCitizenshipSignal(value: string): void {
    this.clearFormControls();
    this.userCitizenshipSignal.set(value);
    this.identificationInfoFormGroup.get('userCitizenship')?.setValue(value);
  }

  protected addControls(controls: Record<string, FormControl>): void {
    Object.keys(controls).forEach((key) => {
      this.identificationInfoFormGroup.addControl(key, controls[key]);
    });
  }

  private clearFormControls(): void {
    Object.keys(this.identificationInfoFormGroup.controls).forEach(
      (controlName) => {
        if (controlName !== 'userCitizenship') {
          this.identificationInfoFormGroup.removeControl(controlName);
        }
      }
    );
  }
}
