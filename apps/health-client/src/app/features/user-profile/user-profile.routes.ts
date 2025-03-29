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
        path: 'settings',
        loadComponent: () =>
          import(
            './components/setting-user-profile/setting-user-profile.component'
          ).then((m) => m.SettingUserProfileComponent),
        children: [
          {
            path: '',
            redirectTo: 'general',
            pathMatch: 'full',
          },
          {
            path: 'general',
            loadComponent: () =>
              import(
                './components/general-setting-user-profile/general-setting-user-profile.component'
              ).then((m) => m.GeneralSettingUserProfileComponent),
          },
          {
            path: 'remove-profile',
            loadComponent: () =>
              import(
                './components/remove-user-profile/remove-user-profile.component'
              ).then((m) => m.RemoveUserProfileComponent),
          },
        ],
      },

      {
        path: 'update',
        loadComponent: () =>
          import(
            './components/update-user-profile/update-user-profile.component'
          ).then((m) => m.UpdateProfileComponent),
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
