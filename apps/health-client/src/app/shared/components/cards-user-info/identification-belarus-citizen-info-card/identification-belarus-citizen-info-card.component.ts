import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  IonCard,
  IonList,
  IonLabel,
  IonText,
  IonCardHeader,
  IonItem,
  IonCardContent,
  IonCardTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonToolbar,
} from '@ionic/angular/standalone';

import {
  FieldInterface,
  IdentificationBelarusCitizenInfoInterface,
} from 'src/app/shared/models';
import { selectUser } from 'src/app/store/user';
import { NavigationService } from 'src/app/features/user-profile/service/navigation/navigation.service';

@Component({
  selector: 'health-identification-belarus-citizen-info-card',
  templateUrl: './identification-belarus-citizen-info-card.component.html',
  styleUrl: './identification-belarus-citizen-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonToolbar,
    IonIcon,
    IonButton,
    IonButtons,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonCardHeader,
    IonText,
    IonLabel,
    IonList,
    IonCard,
    CommonModule,
  ],
})
export class IdentificationBelarusCitizenInfoCardComponent {
  private readonly navigationService = inject(NavigationService);
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly identificationFields: FieldInterface<IdentificationBelarusCitizenInfoInterface>[] =
    [
      {
        key: 'personalIdentificationNumber',
        label: 'Идентификационный личный номер',
      },
      { key: 'passportSeriesNumber', label: 'Серия и номер паспорта' },
      { key: 'passportIssueDate', label: 'Дата выдачи паспорта' },
      { key: 'passportIssuingAuthority', label: 'Орган, выдавший паспорт' },
    ];

  protected editUserInfo(section: string): void {
    const sectionId = this.user()?.identificationBelarusCitizenInfo.id;
    if (sectionId) this.navigationService.editUserInfo(section, sectionId);
  }
}
