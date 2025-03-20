import { createAction, props } from '@ngrx/store';
import { LoginRequestInterface } from 'src/app/shared/models/login-request.interface';
import { ErrorMessageInterface } from 'src/app/shared/models/error-message.interface';

// Инициализация приложения
export const appInitialize = createAction('[App] Initialize');

// Лоадер
export const setLoading = createAction(
  '[App] Set Loading',
  props<{ isLoading: boolean }>()
);

// Авторизация
export const login = createAction(
  '[Auth] Login',
  props<{ loginData: LoginRequestInterface; isDoctor: boolean }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ accessToken: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<ErrorMessageInterface>()
);

export const logout = createAction('[Auth] Logout');
