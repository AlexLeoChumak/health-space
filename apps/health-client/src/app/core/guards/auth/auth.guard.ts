import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, finalize, map, Subject, switchMap, takeUntil } from 'rxjs';
import {
  selectIsAppInitialized,
  selectIsAuthenticated,
} from 'src/app/store/app/app.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const destroy$ = new Subject<void>();

  return store.select(selectIsAppInitialized).pipe(
    // Ждем, пока приложение завершит инициализацию
    filter((isInitialized) => isInitialized),
    switchMap(() =>
      store.select(selectIsAuthenticated).pipe(
        takeUntil(destroy$),
        map((isAuthenticated) => {
          if (isAuthenticated) {
            // Если пользователь залогинен, перенаправляем на домашнюю страницу или другой маршрут
            router.navigate(['/']);
            return false;
          }

          // Если не залогинен, разрешаем доступ
          return true;
        }),
        takeUntil(destroy$)
      )
    ),
    takeUntil(destroy$),
    finalize(() => {
      destroy$.next();
      destroy$.complete();
    })
  );
};
