import { createReducer, on } from '@ngrx/store';
import {
  clearRegistrationState,
  // registration,
  registrationFailure,
  registrationSuccess,
} from 'src/app/store/registration/registration.actions';
import { initialRegistrationState } from 'src/app/store/registration/registration.state';

export const registrationReducer = createReducer(
  initialRegistrationState,
  on(registrationSuccess, (state) => ({
    ...state,
    success: true,
  })),
  on(registrationFailure, (state, { message }) => ({
    ...state,
    error: message,
  })),
  on(clearRegistrationState, () => initialRegistrationState)
);
