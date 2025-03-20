import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadingController } from '@ionic/angular';
import { from, switchMap, tap, of, catchError } from 'rxjs';
import { selectIsLoading } from 'src/app/store/app';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'health-loader',
  template: '',
  standalone: true,
})
export class LoaderComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly loadingCtrl = inject(LoadingController);
  private isLoading$ = this.store.select(selectIsLoading);
  private loaderInstance: HTMLIonLoadingElement | null = null;
  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.isLoading$
      .pipe(
        switchMap((isLoading) => {
          if (isLoading) {
            return from(
              this.loadingCtrl.create({
                spinner: 'crescent',
              })
            ).pipe(
              tap((loader) => {
                this.loaderInstance = loader;
                loader.present();
              })
            );
          } else if (this.loaderInstance) {
            return from(this.loaderInstance.dismiss()).pipe(
              tap(() => {
                this.loaderInstance = null;
              })
            );
          }
          return of(null);
        }),
        catchError(() => {
          return this.loaderInstance
            ? from(this.loaderInstance.dismiss()).pipe(
                tap(() => (this.loaderInstance = null))
              )
            : of(null);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
