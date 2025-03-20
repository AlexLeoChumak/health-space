import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, of, catchError, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { getUserRoleUtil } from 'src/app/shared/utils/get-user-role.util';
import { clearUser, loadUser } from 'src/app/store/user';
import { AuthService } from 'src/app/features/auth/services/auth/auth.service';
import {
  appInitialize,
  login,
  loginFailure,
  loginSuccess,
  logout,
} from 'src/app/store/app';

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
          return of(logout());
        }

        return authService.validateToken(token).pipe(
          switchMap(() => of(loginSuccess({ accessToken: token }), loadUser())),
          catchError(() => {
            return authService.refreshToken(token).pipe(
              tap((userLoginResponse) => {
                localStorageService.setItem(
                  'accessToken',
                  userLoginResponse.accessToken
                );
              }),
              switchMap((userLoginResponse) =>
                of(
                  loginSuccess({ accessToken: userLoginResponse.accessToken }),
                  loadUser()
                )
              ),
              catchError(() => {
                return of(logout());
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

            const role = getUserRoleUtil(response.data.user);
            localStorageService.setItem('role', role);

            router.navigate(['/user-profile']);
          }),
          switchMap((response) =>
            of(
              loginSuccess({ accessToken: response.data.accessToken }),
              loadUser()
            )
          ),
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
