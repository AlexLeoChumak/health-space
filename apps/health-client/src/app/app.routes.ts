import { Routes } from '@angular/router';

import { authRoutes } from 'src/app/features/auth';
import { homeRoutes } from 'src/app/features/home';
import { userProfileRoutes } from 'src/app/features/user-profile';

export const routes: Routes = [
  ...homeRoutes,
  ...authRoutes,
  ...userProfileRoutes,
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
