import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonCardContent,
  IonCard,
  IonList,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';

import { RegistrationBaseComponent } from 'src/app/features/auth';
import {
  ContactInfoFormComponent,
  AddressInfoFormComponent,
  PersonalInfoFormComponent,
  ActionButtonComponent,
  MobilePhoneNumberPasswordInfoFormComponent,
  IdentificationBelarusCitizenInfoFormComponent,
  IdentificationForeignCitizenInfoFormComponent,
} from 'src/app/shared/components';

@Component({
  selector: 'health-registration-patient',
  templateUrl: './registration-patient.component.html',
  styleUrls: ['./registration-patient.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCardTitle,
    IonCardHeader,
    IonList,
    IonCard,
    IonCardContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonCheckbox,
    IonLabel,
    IonItem,
    IonContent,
    ContactInfoFormComponent,
    AddressInfoFormComponent,
    PersonalInfoFormComponent,
    ActionButtonComponent,
    MobilePhoneNumberPasswordInfoFormComponent,
    IdentificationBelarusCitizenInfoFormComponent,
    IdentificationForeignCitizenInfoFormComponent,
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
