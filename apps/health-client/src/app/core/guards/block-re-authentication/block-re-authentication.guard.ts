import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, switchMap, tap, map } from 'rxjs';
import {
  selectIsAppInitialized,
  selectIsAuthenticated,
} from 'src/app/store/app';

export const blockReAuthenticationGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const destroyRef = inject(DestroyRef);

  return store.select(selectIsAppInitialized).pipe(
    filter((isInitialized) => isInitialized),
    switchMap(() =>
      store.select(selectIsAuthenticated).pipe(
        tap((isAuthenticated) => {
          if (isAuthenticated) {
            router.navigate(['/']);
          }
        }),
        map((isAuthenticated) => !isAuthenticated)
      )
    ),
    takeUntilDestroyed(destroyRef)
  );
};
