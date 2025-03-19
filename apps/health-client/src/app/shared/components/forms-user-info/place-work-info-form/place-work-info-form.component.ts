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
import { checkInputValidatorUtility } from 'src/app/shared/utilities';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUserInfoGroup } from 'src/app/store/user';
import { FORM_VALIDATION_CONSTANT } from 'src/app/shared/constants';

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
  protected readonly FORM_VALIDATION_CONSTANT = FORM_VALIDATION_CONSTANT;

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
      .select(selectUserInfoGroup)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (
          data &&
          data.userInfoGroupData &&
          typeof data.userInfoGroupData === 'object' &&
          this.placeWorkInfoFormGroup
        ) {
          this.placeWorkInfoFormGroup.patchValue(data.userInfoGroupData);
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
