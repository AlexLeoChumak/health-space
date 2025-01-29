import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { DoctorRegistrationRequestInterface } from 'src/app/shared/models/doctor/doctor-registration-request.interface';
import { PatientRegistrationRequestInterface } from 'src/app/shared/models/patient/patient-registration-request.interface';
import { selectIsLoading } from 'src/app/store/app';
import {
  clearRegistrationState,
  registration,
  selectRegistrationSuccess,
} from 'src/app/store/registration';

@Component({
  selector: 'health-registration-base',
  template: '',
})
export abstract class RegistrationBaseComponent {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  protected registrationForm!: FormGroup;
  protected readonly isRegistrationAndResidenceAddressesMatch =
    signal<boolean>(false);
  protected readonly isSubmittingForm =
    this.store.selectSignal(selectIsLoading);
  protected initializeForm(): void {
    this.registrationForm = new FormGroup({
      user: new FormGroup({}),
    });
  }

  protected toggleCheckboxCopyRegistrationAddress(): void {
    this.isRegistrationAndResidenceAddressesMatch.update(
      (prevValue) => !prevValue
    );
    this.copyRegistrationAddressToResidenceAddress(
      this.isRegistrationAndResidenceAddressesMatch()
    );
  }

  private copyRegistrationAddressToResidenceAddress(
    isRegistrationAndResidenceAddressesMatch: boolean
  ): void {
    if (isRegistrationAndResidenceAddressesMatch) {
      this.registrationForm
        .get('user.addressResidenceInfo')
        ?.patchValue(
          this.registrationForm.get('user.addressRegistrationInfo')?.value
        );
    } else {
      this.registrationForm.get('user.addressResidenceInfo')?.reset();
    }
  }

  protected addFormGroup(formGroupName: string, formGroup: FormGroup): void {
    const userGroup = this.registrationForm.get('user') as FormGroup;
    userGroup.addControl(formGroupName, formGroup);
  }

  protected onSubmitForm(): void {
    if (this.registrationForm.invalid) return;

    const registrationData:
      | PatientRegistrationRequestInterface
      | DoctorRegistrationRequestInterface = this.registrationForm.value;

    this.store.dispatch(registration({ registrationData }));

    this.store
      .select(selectRegistrationSuccess)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (success) => {
          if (success) {
            this.registrationForm.reset();
          }
        },
        complete: () => {
          this.store.dispatch(clearRegistrationState());
        },
      });
  }
}
