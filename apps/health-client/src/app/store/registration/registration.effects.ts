import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { setLoading } from 'src/app/store/app';
import {
  registration,
  registrationFailure,
  registrationSuccess,
} from 'src/app/store/registration/registration.actions';

export const registrationEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router),
    toastService = inject(ToastService)
  ) =>
    actions$.pipe(
      ofType(registration),
      switchMap(({ registrationData }) =>
        concat(
          of(setLoading({ isLoading: true })),
          authService.registration(registrationData).pipe(
            tap((response) => {
              toastService.presentToast(
                `${response.message}${response.data.firstName}!`
              );
              router.navigate(['/auth/login']);
            }),
            map((response) =>
              registrationSuccess({
                userId: response.data.userId,
                firstName: response.data.firstName,
              })
            ),
            // После успешного результата диспатчим экшен успеха и сразу выключаем лоадер
            switchMap(() => of(setLoading({ isLoading: false }))),
            // При ошибке возвращаем экшен ошибки и выключаем лоадер
            catchError((error: HttpErrorResponse) =>
              of(
                registrationFailure({ message: error?.error?.message }),
                setLoading({ isLoading: false })
              )
            )
          )
        )
      )
    ),
  { functional: true }
);
