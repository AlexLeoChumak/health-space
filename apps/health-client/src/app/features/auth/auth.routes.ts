import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'auth', // Префикс 'auth' для всех маршрутов авторизации
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'registration',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/registration/registration.component').then(
                (m) => m.RegistrationComponent
              ),
          },
          {
            path: 'patient',
            loadComponent: () =>
              import(
                './components/registration-patient/registration-patient.component'
              ).then((m) => m.RegistrationPatientComponent),
          },
          {
            path: 'doctor',
            loadComponent: () =>
              import(
                './components/registration-doctor/registration-doctor.component'
              ).then((m) => m.RegistrationDoctorComponent),
          },
        ],
      },
    ],
  },
];
