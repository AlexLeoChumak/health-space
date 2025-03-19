import { CommonModule } from '@angular/common';
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
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonItemGroup,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { FORM_VALIDATION_CONSTANT } from 'src/app/shared/constants';
import { PhonePrefixFormatterDirective } from 'src/app/shared/directives';
import { checkInputValidatorUtility } from 'src/app/shared/utilities';
import { selectUserInfoGroup } from 'src/app/store/user';

@Component({
  selector: 'health-contact-info-form',
  templateUrl: './contact-info-form.component.html',
  styleUrls: ['./contact-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonItemGroup,
    IonItem,
    IonLabel,
    IonInput,
    ErrorNotificationComponent,
    PhonePrefixFormatterDirective,
  ],
})
export class ContactInfoFormComponent implements OnInit {
  private readonly store = inject(Store);
  public readonly formReady = output<FormGroup>();
  public contactInfoFormGroup!: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  protected readonly FORM_VALIDATION_CONSTANT = FORM_VALIDATION_CONSTANT;

  public ngOnInit(): void {
    this.initializeForm();
    this.updateFormValuesForEdit();
  }

  private initializeForm(): void {
    this.contactInfoFormGroup = new FormGroup({
      homePhoneNumber: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

    this.formReady.emit(this.contactInfoFormGroup);
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
          this.contactInfoFormGroup
        ) {
          this.contactInfoFormGroup.patchValue(data.userInfoGroupData);
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
