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
} from '@ionic/angular/standalone';
import { selectUser } from 'src/app/store/user';
import { IdentificationInfoInterface } from 'src/app/shared/models/patient/patient.interface';
import { FieldInterface } from 'src/app/shared/models/field.interface';

@Component({
  selector: 'health-identification-info-card',
  templateUrl: './identification-info-card.component.html',
  styleUrl: './identification-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
}
