import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { HeaderComponent } from 'src/app/features/header';
import { LoaderComponent } from 'src/app/shared/components';
import { appInitialize } from 'src/app/store/app';

@Component({
  selector: 'health-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonContent,
    CommonModule,
    IonApp,
    IonRouterOutlet,
    HeaderComponent,
    LoaderComponent,
  ],
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit(): void {
    this.dispatchAppStateInitialization();
  }

  private dispatchAppStateInitialization(): void {
    this.store.dispatch(appInitialize());
  }
}
