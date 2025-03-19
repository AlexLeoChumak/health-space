import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonItemGroup,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { FORM_VALIDATION_CONSTANT } from 'src/app/shared/constants';
import { NumericInputRestrictionDirective } from 'src/app/shared/directives';
import { checkInputValidatorUtility } from 'src/app/shared/utilities';
import { selectUserInfoGroup } from 'src/app/store/user';

type AddressPropsType =
  | 'Адрес регистрации'
  | 'Адрес фактического проживания'
  | 'Адрес места работы';

@Component({
  selector: 'health-address-info-form',
  templateUrl: './address-info-form.component.html',
  styleUrls: ['./address-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonItemGroup,
    IonNote,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    ErrorNotificationComponent,
    NumericInputRestrictionDirective,
  ],
})
export class AddressInfoFormComponent implements OnInit {
  private readonly store = inject(Store);
  public readonly addressTypeProps = input<AddressPropsType>();
  public readonly formReady = output<FormGroup>();
  public addressInfoFormGroup!: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  protected addressTypeFromEditProfilePage = signal('');
  protected readonly FORM_VALIDATION_CONSTANT = FORM_VALIDATION_CONSTANT;
  public readonly regions: string[] = [
    'Брестская область',
    'Витебская область',
    'Гомельская область',
    'Гродненская область',
    'Минская область',
    'Могилевская область',
  ];

  public ngOnInit(): void {
    this.initializeForm();
    this.updateFormValuesForEdit();
  }

  private initializeForm(): void {
    const minInputValue = 1;
    const maxInputValue = 99999;

    this.addressInfoFormGroup = new FormGroup({
      region: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      house: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(minInputValue),
        Validators.max(maxInputValue),
      ]),
      housing: new FormControl(null, [
        Validators.pattern('^[0-9]*$'),
        Validators.min(minInputValue),
        Validators.max(maxInputValue),
      ]),
      apartment: new FormControl(null, [
        Validators.pattern('^[0-9]*$'),
        Validators.min(minInputValue),
        Validators.max(maxInputValue),
      ]),
    });

    this.formReady.emit(this.addressInfoFormGroup);
  }

  private updateFormValuesForEdit(): void {
    this.store
      .select(selectUserInfoGroup)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data?.userInfoGroupName) {
          this.addressTypeFromEditProfilePage.set(data.userInfoGroupName);
        }

        if (
          data &&
          data.userInfoGroupName &&
          typeof data.userInfoGroupName === 'object' &&
          this.addressInfoFormGroup
        ) {
          this.addressInfoFormGroup.patchValue(data.userInfoGroupName);
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
