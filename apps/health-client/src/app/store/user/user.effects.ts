import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest, EMPTY, map, mergeMap, of, switchMap } from 'rxjs';
import { BackblazeService } from 'src/app/shared/services/backblaze/backblaze.service';
import { NestedObjectService } from 'src/app/shared/services/nested-object/nested-object.service';
import {
  loadUser,
  selectUser,
  setIdUserSection,
  setUrlUserPhotoSuccess,
  setUserSectionData,
} from 'src/app/store/user';

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
                    setUrlUserPhotoSuccess({ urlUserPhoto: response.data })
                  )
                )
            )
          );
      })
    ),
  { functional: true }
);

export const setUserSectionDataEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);

    return combineLatest([
      actions$.pipe(ofType(setIdUserSection)),
      store.pipe(select(selectUser)),
    ]).pipe(
      mergeMap(([action, user]) => {
        const userSectionData =
          NestedObjectService.findParentAndKeyByIdRecursive(
            user,
            action.idUserSection
          );

        return userSectionData
          ? of(setUserSectionData({ userSectionData }))
          : EMPTY;
      })
    );
  },
  { functional: true }
);
