import { Component, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadingController } from '@ionic/angular';

import { selectIsLoading } from 'src/app/store/app';

@Component({
  selector: 'health-loader',
  template: '',
  standalone: true,
})
export class LoaderComponent {
  private readonly store = inject(Store);
  private readonly loadingCtrl = inject(LoadingController);
  protected readonly isLoading = this.store.selectSignal(selectIsLoading);
  private loaderInstance: HTMLIonLoadingElement | null = null;

  constructor() {
    effect(() => {
      if (this.isLoading() && !this.loaderInstance) {
        this.loadingCtrl
          .create({
            message: 'Пожалуйста, подождите...',
            spinner: 'crescent',
          })
          .then((loader) => {
            this.loaderInstance = loader;
            loader.present();
          });
      } else if (!this.isLoading() && this.loaderInstance) {
        this.loaderInstance.dismiss().then(() => {
          this.loaderInstance = null;
        });
      }
    });
  }
}
