import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButtons,
  IonCardContent,
  IonList,
  IonCard,
} from '@ionic/angular/standalone';

import { RegistrationBaseComponent } from 'src/app/features/auth/components/registration-base/registration-base.component';
import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';

import { PersonalInfoFormComponent } from 'src/app/shared/components/forms-user-info/personal-info-form/personal-info-form.component';
import { PlaceWorkInfoFormComponent } from 'src/app/shared/components/forms-user-info/place-work-info-form/place-work-info-form.component';
import { MobilePhoneNumberPasswordInfoFormComponent } from 'src/app/shared/components/forms-user-info/mobile-phone-number-password-info-form/mobile-phone-number-password-info-form.component';
import { AddressInfoFormComponent } from 'src/app/shared/components/forms-user-info/address-info-form/address-info-form.component';
import { ContactInfoFormComponent } from 'src/app/shared/components/forms-user-info/contact-info-form/contact-info-form.component';
import { EducationMedicalWorkerInfoFormComponent } from 'src/app/shared/components/forms-user-info/education-medical-worker-info-form/education-medical-worker-info-form.component';
import { IdentificationInfoFormComponent } from 'src/app/shared/components/forms-user-info/identification-info-form/identification-info-form.component';

@Component({
  selector: 'health-registration-doctor',
  templateUrl: './registration-doctor.component.html',
  styleUrls: ['./registration-doctor.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCard,
    IonList,
    IonCardContent,
    IonButtons,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonCheckbox,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ContactInfoFormComponent,
    AddressInfoFormComponent,
    PersonalInfoFormComponent,
    IdentificationInfoFormComponent,
    EducationMedicalWorkerInfoFormComponent,
    PlaceWorkInfoFormComponent,
    MobilePhoneNumberPasswordInfoFormComponent,
    ActionButtonComponent,
  ],
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
