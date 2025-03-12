import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  EMPTY,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { UpdateUserProfileService } from 'src/app/features/user-profile/service/update-user-profile/update-user-profile.service';
import {
  DoctorInterface,
  GlobalApiSuccessResponseInterface,
  PatientInterface,
} from 'src/app/shared/models';
import { CloudStorageService } from 'src/app/shared/services';
import { NestedObjectService } from 'src/app/shared/services/nested-object/nested-object.service';
import {
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  selectUser,
  setIdUserSection,
  setUrlUserPhotoSuccess,
  setUserSectionData,
} from 'src/app/store/user';

export const getUserInfo = createEffect(
  (
    actions$ = inject(Actions),
    updateUserProfileService = inject(UpdateUserProfileService)
  ) =>
    actions$.pipe(
      ofType(loadUser),
      mergeMap(() => {
        return updateUserProfileService.getUserInfo().pipe(
          map(
            (
              userData: GlobalApiSuccessResponseInterface<
                PatientInterface | DoctorInterface
              >
            ) => {
              const user = userData.data;
              return loadUserSuccess({ user });
            }
          ),
          catchError((message) => of(loadUserFailure({ message })))
        );
      })
    ),
  { functional: true }
);

export const getUrlUserPhotoEffect = createEffect(
  (
    actions$ = inject(Actions),
    cloudStorageService = inject(CloudStorageService)
  ) =>
    actions$.pipe(
      ofType(loadUserSuccess),
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
