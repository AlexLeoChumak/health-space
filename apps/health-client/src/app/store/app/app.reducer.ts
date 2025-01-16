import { createReducer, on } from '@ngrx/store';
import {
  appInitialize,
  appInitialized,
  initialAppState,
  login,
  loginFailure,
  loginSuccess,
  logout,
  setLoading,
} from 'src/app/store/app';

export const appReducer = createReducer(
  initialAppState,
  on(appInitialize, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(appInitialized, (state) => ({
    ...state,
    isAppInitialized: true,
    isLoading: false,
  })),
  on(setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading,
  })),
  on(login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(loginSuccess, (state, { accessToken }) => ({
    ...state,
    isAuthenticated: true,
    accessToken,
    isLoading: false,
    error: null,
  })),
  on(loginFailure, (state, { message }) => ({
    ...state,
    isAuthenticated: false,
    accessToken: null,
    isLoading: false,
    error: message,
  })),
  on(logout, (state) => ({
    ...state,
    isAuthenticated: false,
    accessToken: null,
  }))
);
