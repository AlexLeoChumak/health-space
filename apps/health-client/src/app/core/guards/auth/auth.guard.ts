import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs';

import {
  selectIsAppInitialized,
  selectIsAuthenticated,
} from 'src/app/store/app';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const destroyRef = inject(DestroyRef);

  return store.select(selectIsAppInitialized).pipe(
    filter((isInitialized) => isInitialized), // Ждем, пока приложение завершит инициализацию
    switchMap(() =>
      store.select(selectIsAuthenticated).pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            router.navigate(['/']); // Если залогинен, перенаправляем на главную
            return false;
          }
          return true; // Если не залогинен, разрешаем доступ
        })
      )
    ),
    takeUntilDestroyed(destroyRef) // Один раз для всей цепочки
  );
};
