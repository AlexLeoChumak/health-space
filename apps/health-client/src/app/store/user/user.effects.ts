import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  concat,
  EMPTY,
  map,
  mergeMap,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { UpdateUserProfileService } from 'src/app/features/user-profile/service/update-user-profile/update-user-profile.service';
import { CloudStorageService } from 'src/app/shared/services';
import { NestedObjectService } from 'src/app/shared/services/nested-object/nested-object.service';
import { setLoading } from 'src/app/store/app';
import {
  DoctorInterface,
  GlobalApiSuccessResponseInterface,
  PatientInterface,
} from 'src/app/shared/models';
import {
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  selectUser,
  setIdUserInfoGroup,
  setUrlUserPhoto,
  setUrlUserPhotoFailure,
  setUrlUserPhotoSuccess,
  setUserInfoGroup,
} from 'src/app/store/user';

export const getUserInfo = createEffect(
  (
    actions$ = inject(Actions),
    updateUserProfileService = inject(UpdateUserProfileService)
  ) =>
    actions$.pipe(
      ofType(loadUser),
      switchMap(() => {
        return updateUserProfileService.getUserInfo().pipe(
          switchMap(
            (
              userData: GlobalApiSuccessResponseInterface<
                PatientInterface | DoctorInterface
              >
            ) => {
              const user = userData.data;
              return concat(
                of(loadUserSuccess({ user })),
                of(setUrlUserPhoto())
              );
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
    store = inject(Store),
    cloudStorageService = inject(CloudStorageService)
  ) =>
    actions$.pipe(
      ofType(setUrlUserPhoto),
      withLatestFrom(store.pipe(select(selectUser))),
      // Игнорирую action, работаю только с user
      switchMap(([, user]) => {
        if (
          !user?.personalInfo?.photo ||
          user.personalInfo.photo instanceof File ||
          typeof user.personalInfo.photo !== 'string'
        ) {
          return of(setLoading({ isLoading: false }));
        }

        const fileName = user.personalInfo.photo;

        return concat(
          of(setLoading({ isLoading: true })),
          cloudStorageService.getPrivatePhotoUrl(fileName).pipe(
            map((response) =>
              setUrlUserPhotoSuccess({ urlUserPhoto: response.data })
            ),
            catchError((error) =>
              of(setUrlUserPhotoFailure({ message: error.message }))
            )
          ),
          of(setLoading({ isLoading: false }))
        );
      }),
      catchError((error) =>
        of(
          setLoading({ isLoading: false }),
          setUrlUserPhotoFailure({ message: error.message })
        )
      )
    ),
  { functional: true }
);

export const setUserInfoGroupEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);

    return combineLatest([
      actions$.pipe(ofType(setIdUserInfoGroup)),
      store.pipe(select(selectUser)),
    ]).pipe(
      mergeMap(([action, user]) => {
        if (!user) {
          return EMPTY;
        }

        const userInfoGroup = NestedObjectService.findParentAndKeyByIdRecursive(
          user as unknown as Record<string, unknown>,
          action.idUserInfoGroup
        );

        return userInfoGroup ? of(setUserInfoGroup({ userInfoGroup })) : EMPTY;
      })
    );
  },
  { functional: true }
);
