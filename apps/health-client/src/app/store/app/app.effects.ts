import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, of, catchError, tap, throwError } from 'rxjs';

import { AuthService } from 'src/app/features/auth/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import {
  appInitialize,
  appInitialized,
  login,
  loginFailure,
  loginSuccess,
  logout,
} from 'src/app/store/app';
import { loadUser, clearUser } from 'src/app/store/user';

export const restoreSessionEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(appInitialize),
      switchMap(() => {
        const token = localStorageService.getItem('accessToken');

        if (!token) {
          console.log('токен нет');
          return of(logout(), appInitialized());
        }

        return authService.validateToken(token).pipe(
          tap(() => console.log('токен валиден')),
          switchMap((user) => [
            loginSuccess({ accessToken: token }),
            loadUser({ user }),
            appInitialized(),
          ]),
          catchError(() => {
            console.log('здесь рефрешится токен');

            return authService.refreshToken(token).pipe(
              tap((userLoginResponse) =>
                localStorageService.setItem(
                  'accessToken',
                  userLoginResponse.accessToken
                )
              ),
              switchMap((userLoginResponse) => [
                loginSuccess({ accessToken: userLoginResponse.accessToken }),
                loadUser({ user: userLoginResponse.user }),
                appInitialized(),
              ]),
              catchError(() => of(logout(), appInitialized()))
            );
          })
        );
      })
    ),
  { functional: true }
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(login),
      switchMap(({ loginData, isDoctor }) =>
        authService.login(loginData, isDoctor).pipe(
          tap((response) => {
            const accessToken = response.data.accessToken;
            localStorageService.setItem('accessToken', accessToken);
          }),
          switchMap((response) => [
            loginSuccess({ accessToken: response.data.accessToken }),
            loadUser({ user: response.data.user }),
          ]),
          catchError((error) =>
            of(loginFailure({ message: error?.error?.message }))
          )
        )
      )
    ),
  { functional: true }
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorageService.removeItem('accessToken');
      }),
      switchMap(() => of(clearUser())),
      catchError((error) => throwError(() => error)) // Простой возврат ошибки вместо throwError
    ),
  { functional: true }
);
