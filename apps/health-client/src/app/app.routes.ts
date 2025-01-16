import { Routes } from '@angular/router';
import { authRoutes } from 'src/app/features/auth/auth.routes';
import { userProfileRoutes } from 'src/app/features/user-profile/user-profile.routes';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
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
