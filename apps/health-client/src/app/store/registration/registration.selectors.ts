import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegistrationState } from 'src/app/store/registration/registration.state';

export const selectRegistrationFeature =
  createFeatureSelector<RegistrationState>('registration');

export const selectRegistrationSuccess = createSelector(
  selectRegistrationFeature,
  (state) => state.success
);

export const selectRegistrationError = createSelector(
  selectRegistrationFeature,
  (state) => state.error
);
