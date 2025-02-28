import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  IonItemGroup,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';

import { FORM_VALIDATION_ERROR_MESSAGES } from 'src/app/shared/constants';
import { checkInputValidatorUtility } from 'src/app/shared/utilities';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUserSectionData } from 'src/app/store/user';

@Component({
  selector: 'health-place-work-info-form',
  templateUrl: './place-work-info-form.component.html',
  styleUrls: ['./place-work-info-form.component.scss'],
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
export class PlaceWorkInfoFormComponent implements OnInit {
  private readonly store = inject(Store);
  protected readonly formReady = output<FormGroup>();
  protected placeWorkInfoFormGroup!: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  protected readonly formValidationErrorMessages =
    FORM_VALIDATION_ERROR_MESSAGES;

  public ngOnInit(): void {
    this.initializeForm();
    this.updateFormValuesForEdit();
  }

  private initializeForm(): void {
    this.placeWorkInfoFormGroup = new FormGroup({
      nameMedicalInstitution: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      currentSpecialization: new FormControl(null, [Validators.required]),
    });

    this.formReady.emit(this.placeWorkInfoFormGroup);
  }

  private updateFormValuesForEdit(): void {
    this.store
      .select(selectUserSectionData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (
          data &&
          data.childObj &&
          typeof data.childObj === 'object' &&
          this.placeWorkInfoFormGroup
        ) {
          this.placeWorkInfoFormGroup.patchValue(data.childObj);
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
