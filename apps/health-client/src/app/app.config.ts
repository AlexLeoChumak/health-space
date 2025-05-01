import { ApplicationConfig } from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import * as RegistrationEffects from 'src/app/store/registration/registration.effects';
import * as AppEffects from 'src/app/store/app/app.effects';
import * as UserEffects from 'src/app/store/user/user.effects';
import { routes } from 'src/app/app.routes';
import { authInterceptor, errorInterceptor } from 'src/app/core/interceptors';
import { appReducer } from 'src/app/store/app';
import { registrationReducer } from 'src/app/store/registration';
import { userReducer } from 'src/app/store/user';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideStore({
      app: appReducer,
      registration: registrationReducer,
      user: userReducer,
    }),
    provideEffects(AppEffects, RegistrationEffects, UserEffects),
    provideStoreDevtools(),
  ],
};

// nx g @nx/angular:service shared/services/backblaze/backblaze --project=health-client
// nx g @nx/angular:component apps/health-client/src/app/shared/components/cards-user-info/address-info-card/address-info-card
// nx g @nx/angular:component apps/health-client/src/app/features/user-profile/components/general-setting-user-profile/general-setting-user-profile
// import { LetDirective } from '@ngrx/component'; для ngrxLet и ngrxPush
