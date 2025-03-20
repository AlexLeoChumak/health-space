import { createReducer, on } from '@ngrx/store';
import {
  initialAppState,
  login,
  loginFailure,
  loginSuccess,
  logout,
  setLoading,
} from 'src/app/store/app';

export const appReducer = createReducer(
  initialAppState,
  on(setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading,
  })),
  on(login, (state) => ({
    ...state,
    error: null,
  })),
  on(loginSuccess, (state, { accessToken }) => ({
    ...state,
    isAuthenticated: true,
    accessToken,
    error: null,
  })),
  on(loginFailure, (state, { message }) => ({
    ...state,
    isAuthenticated: false,
    accessToken: null,
    error: message,
  })),
  on(logout, (state) => ({
    ...state,
    isAuthenticated: false,
    accessToken: null,
  }))
);
