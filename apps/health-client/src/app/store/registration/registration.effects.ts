import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, of, switchMap, tap } from 'rxjs';
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
    store = inject(Store),
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router),
    toastService = inject(ToastService)
  ) =>
    actions$.pipe(
      ofType(registration),
      tap(() => store.dispatch(setLoading({ isLoading: true }))),
      switchMap(({ registrationData }) =>
        authService.registration(registrationData).pipe(
          tap((response) => {
            toastService.presentToast(
              `${response.message}${response.data.firstName}!`
            );
            router.navigate(['/auth/login']);
          }),
          map((response) => {
            return registrationSuccess({
              userId: response.data.userId,
              firstName: response.data.firstName,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            store.dispatch(setLoading({ isLoading: false }));
            return of(registrationFailure({ message: error?.error?.message }));
          }),
          finalize(() => store.dispatch(setLoading({ isLoading: false })))
        )
      )
    ),
  { functional: true }
);
