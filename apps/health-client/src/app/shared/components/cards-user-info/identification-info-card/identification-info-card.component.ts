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
  IdentificationInfoInterface,
} from 'src/app/shared/models';
import { selectUser } from 'src/app/store/user';
import { NavigationService } from 'src/app/features/user-profile/service/navigation/navigation.service';

@Component({
  selector: 'health-identification-info-card',
  templateUrl: './identification-info-card.component.html',
  styleUrl: './identification-info-card.component.scss',
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
export class IdentificationInfoCardComponent {
  private readonly navigationService = inject(NavigationService);
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly other: string = 'Иное';
  protected readonly identificationFields: FieldInterface<IdentificationInfoInterface>[] =
    [
      { key: 'userCitizenship', label: 'Гражданство' },
      {
        key: 'personalIdentificationNumber',
        label: 'Идентификационный личный номер',
      },
      { key: 'passportSeriesNumber', label: 'Серия и номер паспорта' },
      { key: 'passportIssueDate', label: 'Дата выдачи паспорта' },
      { key: 'passportIssuingAuthority', label: 'Орган, выдавший паспорт' },

      { key: 'documentName', label: 'Наименование документа' },
      { key: 'documentNumber', label: 'Номер документа' },
      {
        key: 'nameInsuranceCompany',
        label: 'Наименование компании - медицинского страховщика',
      },
      {
        key: 'healthInsuranceContractNumber',
        label: 'Номер договора медицинского страхования',
      },
    ];

  protected editUserInfo(section: string): void {
    const sectionId = this.user()?.personalInfo.id;
    if (sectionId) this.navigationService.editUserInfo(section, sectionId);
  }
}
