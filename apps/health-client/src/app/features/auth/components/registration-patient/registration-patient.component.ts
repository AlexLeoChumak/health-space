import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
} from '@ionic/angular/standalone';

import { RegistrationBaseComponent } from 'src/app/features/auth/components/registration-base/registration-base.component';
import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';
import { AddressInfoFormComponent } from 'src/app/shared/components/address-info-form/address-info-form.component';
import { ContactInfoFormComponent } from 'src/app/shared/components/contact-info-form/contact-info-form.component';
import { IdentificationInfoFormComponent } from 'src/app/shared/components/identification-info-form/identification-info-form.component';
import { PersonalInfoFormComponent } from 'src/app/shared/components/personal-info-form/personal-info-form.component';
import { MobilePhoneNumberPasswordInfoFormComponent } from 'src/app/shared/components/mobile-phone-number-password-info-form/mobile-phone-number-password-info-form.component';

@Component({
  selector: 'health-registration-patient',
  templateUrl: './registration-patient.component.html',
  styleUrls: ['./registration-patient.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButtons,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonCol,
    IonRow,
    IonGrid,
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
    ActionButtonComponent,
    MobilePhoneNumberPasswordInfoFormComponent,
  ],
})
export class RegistrationPatientComponent
  extends RegistrationBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.initializeForm();
  }
}
