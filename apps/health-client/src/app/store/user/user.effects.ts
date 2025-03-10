import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest, EMPTY, map, mergeMap, of, switchMap } from 'rxjs';
import { CloudStorageService } from 'src/app/shared/services';
import { NestedObjectService } from 'src/app/shared/services/nested-object/nested-object.service';
import {
  loadUser,
  selectUser,
  setIdUserSection,
  setUrlUserPhotoSuccess,
  setUserSectionData,
} from 'src/app/store/user';

export const getUrlUserPhotoEffect = createEffect(
  (
    actions$ = inject(Actions),
    cloudStorageService = inject(CloudStorageService)
  ) =>
    actions$.pipe(
      ofType(loadUser),
      switchMap((action) => {
        const fileName = action?.user.personalInfo.photo;

        if (fileName instanceof File || typeof fileName !== 'string') {
          return EMPTY;
        }

        return cloudStorageService
          .getPrivatePhotoUrl(fileName)
          .pipe(
            map((response) =>
              setUrlUserPhotoSuccess({ urlUserPhoto: response.data })
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
        if (!user) {
          return EMPTY;
        }

        const userSectionData =
          NestedObjectService.findParentAndKeyByIdRecursive(
            user as unknown as Record<string, unknown>,
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
