import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonItem,
  IonLabel,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { AddressInfoInterface, FieldInterface } from 'src/app/shared/models';
import { selectUser } from 'src/app/store/user';
import { NavigationService } from 'src/app/features/user-profile/service/navigation/navigation.service';

type PatientAddressProps = 'addressRegistrationInfo' | 'addressResidenceInfo';
type DoctorAddressProps = PatientAddressProps | 'addressMedicalInstitutionInfo';
type AddressPropsType = PatientAddressProps | DoctorAddressProps;

@Component({
  selector: 'health-address-info-card',
  templateUrl: './address-info-card.component.html',
  styleUrl: './address-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonToolbar,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonText,
    IonLabel,
    IonItem,
    CommonModule,
  ],
})
export class AddressInfoCardComponent {
  public readonly addressTypeProps = input.required<AddressPropsType>();
  private readonly navigationService = inject(NavigationService);
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);

  protected readonly addressInfo = computed<AddressInfoInterface | null>(() => {
    const user = this.user();

    if (!user) return null;

    const addressType = this.addressTypeProps();
    // Проверяю, есть ли у объекта нужное поле перед доступом
    if (addressType in user) {
      return user[addressType as keyof typeof user] as AddressInfoInterface;
    }

    return null;
  });

  protected readonly addressFields: FieldInterface<AddressInfoInterface>[] = [
    { key: 'region', label: 'Область' },
    { key: 'district', label: 'Район' },
    { key: 'city', label: 'Город' },
    { key: 'street', label: 'Улица' },
    { key: 'house', label: 'Дом' },
    { key: 'housing', label: 'Корпус' },
    { key: 'apartment', label: 'Квартира' },
  ];

  protected editUserInfo(section: string): void {
    const userData = this.user();

    if (userData) {
      const addressType = this.addressTypeProps();

      // Проверяю, существует ли addressType в userData
      if (addressType in userData) {
        const addressData = userData[addressType as keyof typeof userData];

        // Проверяю, что addressData - это объект с полем id
        if (
          addressData &&
          typeof addressData === 'object' &&
          'id' in addressData
        ) {
          const sectionId = addressData.id;
          if (sectionId)
            this.navigationService.editUserInfo(section, sectionId);
        }
      }
    }
  }
}
