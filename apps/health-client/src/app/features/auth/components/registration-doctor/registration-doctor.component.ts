import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonCardContent,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';

import { RegistrationBaseComponent } from 'src/app/features/auth';
import {
  ContactInfoFormComponent,
  AddressInfoFormComponent,
  PersonalInfoFormComponent,
  EducationMedicalWorkerInfoFormComponent,
  PlaceWorkInfoFormComponent,
  MobilePhoneNumberPasswordInfoFormComponent,
  ActionButtonComponent,
  IdentificationBelarusCitizenInfoFormComponent,
  IdentificationForeignCitizenInfoFormComponent,
} from 'src/app/shared/components';

@Component({
    selector: 'health-registration-doctor',
    templateUrl: './registration-doctor.component.html',
    styleUrls: ['./registration-doctor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        IonCardTitle,
        IonCardHeader,
        IonCard,
        IonList,
        IonCardContent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonCheckbox,
        IonLabel,
        IonItem,
        IonContent,
        ContactInfoFormComponent,
        AddressInfoFormComponent,
        PersonalInfoFormComponent,
        EducationMedicalWorkerInfoFormComponent,
        PlaceWorkInfoFormComponent,
        MobilePhoneNumberPasswordInfoFormComponent,
        ActionButtonComponent,
        IdentificationBelarusCitizenInfoFormComponent,
        IdentificationForeignCitizenInfoFormComponent,
    ]
})
export class RegistrationDoctorComponent
  extends RegistrationBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }
}
