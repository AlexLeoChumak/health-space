import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, of, catchError, tap } from 'rxjs';

import { AuthService } from 'src/app/features/auth/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { getUserRole } from 'src/app/shared/utilities/get-user-role.utility';
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
    toastService = inject(ToastService),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(appInitialize),
      switchMap(() => {
        const token = localStorageService.getItem('accessToken');

        if (!token) {
          return of(logout(), appInitialized());
        }

        return authService.validateToken(token).pipe(
          switchMap((user) => [
            loginSuccess({ accessToken: token }),
            loadUser({ user }),
            appInitialized(),
          ]),
          catchError(() => {
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
              catchError((error: HttpErrorResponse) => {
                toastService.presentToast(error.error.message);
                return of(logout(), appInitialized());
              })
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
    router = inject(Router),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(login),
      switchMap(({ loginData, isDoctor }) =>
        authService.login(loginData, isDoctor).pipe(
          tap((response) => {
            const accessToken = response.data.accessToken;
            localStorageService.setItem('accessToken', accessToken);

            const role = getUserRole(response.data.user);
            localStorageService.setItem('role', role);

            router.navigate(['/user-profile']);
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
    router = inject(Router),
    actions$ = inject(Actions),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorageService.removeItem('accessToken');
        localStorageService.removeItem('role');
        router.navigate(['auth/login']);
      }),
      switchMap(() => of(clearUser()))
    ),
  { functional: true }
);
