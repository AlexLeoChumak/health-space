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
} from '@ionic/angular/standalone';

import { selectUser } from 'src/app/store/user';
import { NavigationService } from 'src/app/shared/services';
import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';

@Component({
  selector: 'health-mobile-phone-number-password-info-card',
  templateUrl: './mobile-phone-number-password-info-card.component.html',
  styleUrl: './mobile-phone-number-password-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonToolbar,
    CommonModule,
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
    ActionButtonComponent,
  ],
})
export class MobilePhoneNumberPasswordInfoCardComponent {
  private readonly navigationService = inject(NavigationService);
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);

  protected editUserInfo(section: string): void {
    const sectionId = this.user()?.mobilePhoneNumberPasswordInfo?.id;
    if (sectionId) this.navigationService.editUserInfo(section, sectionId);
  }
}
