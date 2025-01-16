import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/store/user/user.state';

export const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserFeature,
  (state) => state.user
);

export const selectUserRole = createSelector(selectUserFeature, (state) => {
  if (state.user) {
    return 'placeWorkInfo' in state.user ? 'doctor' : 'patient';
  }
  return null;
});

export const selectIsUserLoggedIn = createSelector(
  selectUserFeature,
  (state) => !!state.user
);
