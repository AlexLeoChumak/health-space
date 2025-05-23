import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  PatientRegistrationRequestInterface,
  DoctorRegistrationRequestInterface,
} from 'src/app/shared/models';
import { selectIsLoading } from 'src/app/store/app';
import {
  registration,
  selectRegistrationSuccess,
  clearRegistrationState,
} from 'src/app/store/registration';

@Component({
    selector: 'health-registration-base',
    template: '',
    standalone: false
})
export abstract class RegistrationBaseComponent {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  protected registrationForm!: FormGroup;
  protected readonly isRegistrationAndResidenceAddressesMatch = signal(false);
  protected readonly isBelarusCitizen = signal(true);
  protected readonly isSubmittingForm =
    this.store.selectSignal(selectIsLoading);
  protected initializeForm(): void {
    this.registrationForm = new FormGroup({
      user: new FormGroup({}),
    });
  }

  protected toggleCheckboxCopyRegistrationAddress(): void {
    this.isRegistrationAndResidenceAddressesMatch.update(
      (prevValue) => !prevValue,
    );
    this.copyRegistrationAddressToResidenceAddress(
      this.isRegistrationAndResidenceAddressesMatch(),
    );
  }

  protected toggleCheckboxIsBelarusCitizen(): void {
    this.isBelarusCitizen.update((prevValue) => !prevValue);

    this.removeFormGroup();
  }

  private removeFormGroup(): void {
    const userGroup = this.registrationForm.get('user') as FormGroup;

    if (this.isBelarusCitizen()) {
      userGroup.removeControl('identificationForeignCitizenInfo');
    } else {
      userGroup.removeControl('identificationBelarusCitizenInfo');
    }
  }

  protected addFormGroup(formGroupName: string, formGroup: FormGroup): void {
    const userGroup = this.registrationForm.get('user') as FormGroup;
    userGroup.addControl(formGroupName, formGroup);
  }

  private copyRegistrationAddressToResidenceAddress(
    isRegistrationAndResidenceAddressesMatch: boolean,
  ): void {
    if (isRegistrationAndResidenceAddressesMatch) {
      this.registrationForm
        .get('user.addressResidenceInfo')
        ?.patchValue(
          this.registrationForm.get('user.addressRegistrationInfo')?.value,
        );
    } else {
      this.registrationForm.get('user.addressResidenceInfo')?.reset();
    }
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
