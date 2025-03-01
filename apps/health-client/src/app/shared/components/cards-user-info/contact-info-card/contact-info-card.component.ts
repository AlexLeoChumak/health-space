import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

import { selectUser } from 'src/app/store/user';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'health-contact-info-card',
  templateUrl: './contact-info-card.component.html',
  styleUrl: './contact-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonToolbar,
    IonText,
    IonLabel,
    IonItem,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    CommonModule,
  ],
})
export class ContactInfoCardComponent {
  private readonly navigationService = inject(NavigationService);
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);

  protected editUserInfo(section: string): void {
    const sectionId = this.user()?.contactInfo.id;
    if (sectionId) this.navigationService.editUserInfo(section, sectionId);
  }
}
