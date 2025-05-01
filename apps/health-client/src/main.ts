import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { appConfig } from 'src/app/app.config';
import { configureIcons } from 'src/app/core/config/icon.config';

configureIcons();

bootstrapApplication(AppComponent, appConfig);
