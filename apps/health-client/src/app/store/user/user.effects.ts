import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { getUserRole } from 'src/app/shared/utils/get-user-role.utility';
import { clearUser, loadUser } from 'src/app/store/user';

export const loadUserSaveRoleToLocalStorage = createEffect(
  (
    actions$ = inject(Actions),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(loadUser),
      tap(({ user }) => {
        const role = getUserRole(user);
        localStorageService.setItem('role', role);
      })
    ),
  { functional: true, dispatch: false }
);

export const removeRoleFromLocalStorage = createEffect(
  (
    actions$ = inject(Actions),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(clearUser),
      tap(() => {
        localStorageService.removeItem('role');
      })
    ),
  { functional: true, dispatch: false }
);
