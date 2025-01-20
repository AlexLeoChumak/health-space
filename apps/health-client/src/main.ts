import { bootstrapApplication } from '@angular/platform-browser';
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

import { AppComponent } from 'src/app/app.component';
import { routes } from 'src/app/app.routes';
import { errorInterceptor } from 'src/app/core/interceptors/error.interceptor';
import * as RegistrationEffects from 'src/app/store/registration/registration.effects';
import * as AppEffects from 'src/app/store/app/app.effects';
import * as UserEffects from 'src/app/store/user/user.effects';
import { registrationReducer } from 'src/app/store/registration';
import { userReducer } from 'src/app/store/user';
import { appReducer } from 'src/app/store/app/app.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideStore({
      app: appReducer,
      registration: registrationReducer,
      user: userReducer,
    }),
    provideEffects(AppEffects, RegistrationEffects, UserEffects),
    provideStoreDevtools(),
  ],
});

// генерация nx g @nx/angular:service shared/services/backblaze/backblaze --project=health-client
