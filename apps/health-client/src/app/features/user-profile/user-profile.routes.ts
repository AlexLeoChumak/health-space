import { Routes } from '@angular/router';

export const userProfileRoutes: Routes = [
  {
    path: 'user-profile',
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
            (m) => m.EditProfileComponent
          ),
        children: [
          {
            path: 'update-password',
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
