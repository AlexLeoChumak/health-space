import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectIsAppInitialized = createSelector(
  selectAppState,
  (state) => state.isAppInitialized
);

export const selectIsLoading = createSelector(
  selectAppState,
  (state) => state.isLoading
);

export const selectIsAuthenticated = createSelector(
  selectAppState,
  (state) => state.isAuthenticated
);

export const selectAccessToken = createSelector(
  selectAppState,
  (state) => state.accessToken
);

export const selectError = createSelector(
  selectAppState,
  (state) => state.error
);
