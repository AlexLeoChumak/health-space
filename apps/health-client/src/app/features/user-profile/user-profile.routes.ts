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
        path: 'edit',
        loadComponent: () =>
          import('./components/edit-profile/edit-profile.component').then(
            (m) => m.EditProfileComponent
          ),
      },
    ],
  },
];
