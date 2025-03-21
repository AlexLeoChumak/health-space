import { Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards';

export const userProfileRoutes: Routes = [
  {
    path: 'user-profile',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/user-profile/user-profile.component').then(
            (m) => m.UserProfileComponent
          ),
      },
      {
        path: 'update',
        loadComponent: () =>
          import('./components/update-profile/update-profile.component').then(
            (m) => m.UpdateProfileComponent
          ),
        children: [
          {
            path: 'password',
            loadComponent: () =>
              import(
                './components/update-password-form/update-password-form.component'
              ).then((m) => m.UpdatePasswordFormComponent),
          },
        ],
      },
    ],
  },
];
