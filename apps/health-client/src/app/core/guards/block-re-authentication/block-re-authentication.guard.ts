import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap, map, take, filter } from 'rxjs';
import { selectIsAuthenticated } from 'src/app/store/app';

export const blockReAuthenticationGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const destroyRef = inject(DestroyRef);

  return store.select(selectIsAuthenticated).pipe(
    filter((isAuthenticated) => isAuthenticated !== null),
    take(1),
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['/']);
      }
    }),
    map((isAuthenticated) => !isAuthenticated),
    takeUntilDestroyed(destroyRef)
  );
};
