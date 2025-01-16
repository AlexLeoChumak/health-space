import { createAction, props } from '@ngrx/store';
import { RegistrationApiResponseInterface } from 'src/app/features/auth/models/registration-response.interface';
import { DoctorRegistrationRequestInterface } from 'src/app/shared/models/doctor/doctor-registration-request.interface';
import { ErrorMessageInterface } from 'src/app/shared/models/error-message.interface';
import { PatientRegistrationRequestInterface } from 'src/app/shared/models/patient/patient-registration-request.interface';

// Registration
export const registration = createAction(
  '[Auth] Registration',
  props<{
    registrationData:
      | PatientRegistrationRequestInterface
      | DoctorRegistrationRequestInterface;
  }>()
);

export const registrationSuccess = createAction(
  '[Auth] Registration Success',
  props<RegistrationApiResponseInterface>()
);

export const registrationFailure = createAction(
  '[Auth] Registration Failure',
  props<ErrorMessageInterface>()
);

export const clearRegistrationState = createAction(
  '[Auth] Clear Registration State'
);
