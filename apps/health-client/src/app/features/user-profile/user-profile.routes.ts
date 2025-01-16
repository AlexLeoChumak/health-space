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
    ],
  },
];
