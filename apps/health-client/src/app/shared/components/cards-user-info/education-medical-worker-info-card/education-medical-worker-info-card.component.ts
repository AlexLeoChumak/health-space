import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  IonCard,
  IonText,
  IonCardHeader,
  IonLabel,
  IonCardContent,
  IonList,
  IonItem,
  IonCardTitle,
} from '@ionic/angular/standalone';

import {
  EducationMedicalWorkerInfoInterface,
  FieldInterface,
} from 'src/app/shared/models';
import { selectUser } from 'src/app/store/user';

@Component({
  selector: 'health-education-medical-worker-info-card',
  templateUrl: './education-medical-worker-info-card.component.html',
  styleUrl: './education-medical-worker-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCardTitle,
    IonItem,
    IonList,
    IonCardContent,
    IonLabel,
    IonCardHeader,
    IonText,
    IonCard,
    CommonModule,
  ],
})
export class EducationMedicalWorkerInfoCardComponent {
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);

  protected readonly educationInfo =
    computed<EducationMedicalWorkerInfoInterface | null>(() => {
      const user = this.user();
      return user && 'educationMedicalWorkerInfo' in user
        ? user.educationMedicalWorkerInfo
        : null;
    });

  protected readonly educationMedicalWorkerFields: FieldInterface<EducationMedicalWorkerInfoInterface>[] =
    [
      {
        key: 'nameEducationalInstitution',
        label: 'Наименование учреждения образования',
      },
      {
        key: 'faculty',
        label: 'Факультет',
      },
      { key: 'speciality', label: 'Специальность' },
      { key: 'specialization', label: 'Специализация' },
      {
        key: 'numberDiplomaHigherMedicalEducation',
        label: 'Номер диплома о высшем медицинском образовании',
      },
      {
        key: 'licenseNumberMedicalActivities',
        label: 'Номер лицензии на право осуществления медицинской деятельности',
      },
      {
        key: 'specialistCertificateNumber',
        label: 'Номер сертификата специалиста',
      },
    ];
}
