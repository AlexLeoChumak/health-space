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
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { selectUser } from 'src/app/store/user';
import { AddressInfoInterface } from 'src/app/shared/models/patient/patient.interface';
import { FieldInterface } from 'src/app/shared/models/field.interface';

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
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly addressFields: FieldInterface<AddressInfoInterface>[] = [
    { key: 'region', label: 'Область' },
    { key: 'district', label: 'Район' },
    { key: 'city', label: 'Город' },
    { key: 'street', label: 'Улица' },
    { key: 'house', label: 'Дом' },
    { key: 'housing', label: 'Корпус' },
    { key: 'apartment', label: 'Квартира' },
  ];

  selectedAddress = computed<AddressInfoInterface | null>(() => {
    const user = this.user();
    if (!user) return null;

    // Проверяем, есть ли у объекта нужное поле перед доступом
    if (this.addressTypeProps() in user) {
      return user[
        this.addressTypeProps() as keyof typeof user
      ] as AddressInfoInterface;
    }

    return null;
  });
}
