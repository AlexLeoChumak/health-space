import { Routes } from '@angular/router';
import { authRoutes } from 'src/app/features/auth/auth.routes';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  ...authRoutes,
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
