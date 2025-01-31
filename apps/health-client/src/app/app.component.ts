import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';

import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { LoaderComponent } from './core/components/loader/loader.component';
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
    FooterComponent,
    LetDirective,
    LoaderComponent,
  ],
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  protected readonly showHeaderFooter$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event: NavigationEnd) => {
      return !event.url.includes('auth');
    })
  );

  public ngOnInit(): void {
    this.dispatchAppStateInitialization();
  }

  private dispatchAppStateInitialization(): void {
    this.store.dispatch(appInitialize());
  }
}
