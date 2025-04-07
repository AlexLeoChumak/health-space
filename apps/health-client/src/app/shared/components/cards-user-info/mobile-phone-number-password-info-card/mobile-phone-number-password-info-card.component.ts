import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  IonCard,
  IonCardHeader,
  IonList,
  IonLabel,
  IonItem,
  IonText,
  IonButton,
  IonCardContent,
  IonCardTitle,
  IonButtons,
  IonIcon,
  IonToolbar,
  IonRouterLink,
} from '@ionic/angular/standalone';

import { selectUser } from 'src/app/store/user';
import { NavigationService } from 'src/app/shared/services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'health-mobile-phone-number-password-info-card',
  templateUrl: './mobile-phone-number-password-info-card.component.html',
  styleUrl: './mobile-phone-number-password-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    IonRouterLink,
    IonToolbar,
    IonIcon,
    IonButtons,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonText,
    IonItem,
    IonLabel,
    IonList,
    IonCardHeader,
    IonCard,
  ],
})
export class MobilePhoneNumberPasswordInfoCardComponent {
  private readonly navigationService = inject(NavigationService);
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);

  protected navigateToUpdatePage(section: string): void {
    const sectionId = this.user()?.mobilePhoneNumberPasswordInfo?.id;
    if (sectionId)
      this.navigationService.navigateToUpdatePage(section, sectionId);
  }
}
