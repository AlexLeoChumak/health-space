import {
  Component,
  inject,
  signal,
  OnDestroy,
  WritableSignal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegistrationApiResponseInterface } from 'src/app/features/auth/models/registration-response.interface';

import { AuthService } from 'src/app/features/auth/services/auth.service';
import { DoctorRegistrationRequestInterface } from 'src/app/shared/models/doctor/doctor-registration-request.interface';
import { GlobalApiResponseInterface } from 'src/app/shared/models/global-api-response.interface';
import { PatientRegistrationRequestInterface } from 'src/app/shared/models/patient/patient-registration-request.interface';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'health-registration-base',
  template: '',
})
export abstract class RegistrationBaseComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  registrationForm!: FormGroup;
  isRegistrationAndResidenceAddressesMatch: WritableSignal<boolean> =
    signal<boolean>(false);
  private registrationSubscription!: Subscription;

  initializeForm(): void {
    this.registrationForm = new FormGroup({
      user: new FormGroup({}),
    });
  }

  toggleCheckboxCopyRegistrationAddress(): void {
    this.isRegistrationAndResidenceAddressesMatch.update(
      (prevValue) => !prevValue
    );
    this.copyRegistrationAddressToResidenceAddress(
      this.isRegistrationAndResidenceAddressesMatch()
    );
  }

  copyRegistrationAddressToResidenceAddress(
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

  addFormGroup(formGroupName: string, formGroup: FormGroup): void {
    const userGroup = this.registrationForm.get('user') as FormGroup;
    userGroup.addControl(formGroupName, formGroup);
  }

  onSubmitForm(): void {
    const userData:
      | PatientRegistrationRequestInterface
      | DoctorRegistrationRequestInterface = this.registrationForm.value;

    console.log('userData', userData); //удалить

    this.registrationSubscription = this.authService
      .registration(userData)
      .subscribe({
        next: (
          res: GlobalApiResponseInterface<RegistrationApiResponseInterface>
        ) => {
          this.toastService.presentToast(res.message);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }
}
