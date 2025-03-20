import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonButton,
  IonToolbar,
  IonButtons,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import {
  FieldInterface,
  IdentificationForeignCitizenInfoInterface,
} from 'src/app/shared/models';
import { selectUser } from 'src/app/store/user';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'health-identification-foreign-citizen-info-card',
  templateUrl: './identification-foreign-citizen-info-card.component.html',
  styleUrl: './identification-foreign-citizen-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonToolbar,
    IonCard,
    CommonModule,
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
  ],
})
export class IdentificationForeignCitizenInfoCardComponent {
  private readonly navigationService = inject(NavigationService);
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly identificationFields: FieldInterface<IdentificationForeignCitizenInfoInterface>[] =
    [
      {
        key: 'nameStateForeignCitizen',
        label: 'Гражданство',
      },
      {
        key: 'documentName',
        label: 'Наименование документа, удостоверяющего личность',
      },
      {
        key: 'documentNumber',
        label: 'Номер документа, удостоверяющего личность',
      },
      {
        key: 'nameInsuranceCompany',
        label: 'Наименование компании - медицинского страховщика',
      },
      {
        key: 'healthInsuranceContractNumber',
        label: 'Номер договора медицинского страхования',
      },
    ];

  protected navigateToUpdatePage(section: string): void {
    const sectionId = this.user()?.identificationForeignCitizenInfo.id;
    if (sectionId)
      this.navigationService.navigateToUpdatePage(section, sectionId);
  }
}
