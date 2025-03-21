import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap, map, take, filter, Observable } from 'rxjs';
import { selectIsAuthenticated } from 'src/app/store/app';

export const blockReAuthenticationGuard: CanActivateFn =
  (): Observable<boolean> => {
    const store = inject(Store);
    const router = inject(Router);

    return store.select(selectIsAuthenticated).pipe(
      filter((isAuthenticated) => isAuthenticated !== null),
      take(1),
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigate(['/']);
        }
      }),
      map((isAuthenticated) => !isAuthenticated)
    );
  };
