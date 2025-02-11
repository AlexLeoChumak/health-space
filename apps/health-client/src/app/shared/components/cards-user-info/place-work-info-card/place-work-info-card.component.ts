import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonText,
  IonList,
  IonCardTitle,
  IonLabel,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { PlaceWorkInfoInterface, FieldInterface } from 'src/app/shared/models';
import { selectUser } from 'src/app/store/user';

@Component({
  selector: 'health-place-work-info-card',
  templateUrl: './place-work-info-card.component.html',
  styleUrl: './place-work-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonLabel,
    IonCardTitle,
    IonList,
    IonText,
    IonItem,
    IonCardContent,
    IonCardHeader,
    IonCard,
    CommonModule,
  ],
})
export class PlaceWorkInfoCardComponent {
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected placeWorkInfo = computed<PlaceWorkInfoInterface | null>(() => {
    const user = this.user();
    return user && 'placeWorkInfo' in user ? user.placeWorkInfo : null;
  });
  protected readonly placeWorkFields: FieldInterface<PlaceWorkInfoInterface>[] =
    [
      {
        key: 'nameMedicalInstitution',
        label: 'Наименование медицинского учреждения',
      },
      {
        key: 'department',
        label: 'Отделение',
      },
      { key: 'currentSpecialization', label: 'Текущая специализация' },
    ];
}
