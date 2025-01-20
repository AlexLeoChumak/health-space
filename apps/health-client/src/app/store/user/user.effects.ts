import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, map, switchMap } from 'rxjs';
import { BackblazeService } from 'src/app/shared/services/backblaze/backblaze.service';
import { getUrlUserPhotoSuccess, loadUser } from 'src/app/store/user';

export const getUrlUserPhotoEffect = createEffect(
  (actions$ = inject(Actions), backblazeService = inject(BackblazeService)) =>
    actions$.pipe(
      ofType(loadUser),
      switchMap((action) => {
        const fileName = action?.user.personalInfo.photo;

        if (fileName instanceof File || typeof fileName !== 'string') {
          return EMPTY;
        }

        return backblazeService
          .authorize()
          .pipe(
            switchMap(() =>
              backblazeService
                .getPrivatePhotoUrl(fileName)
                .pipe(
                  map((response) =>
                    getUrlUserPhotoSuccess({ urlUserPhoto: response.data })
                  )
                )
            )
          );
      })
    ),
  { functional: true }
);
