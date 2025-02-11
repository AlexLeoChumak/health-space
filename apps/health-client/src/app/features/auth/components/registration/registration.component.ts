import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';

import { ActionButtonComponent } from 'src/app/shared/components';

@Component({
  selector: 'health-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonCard,
    CommonModule,
    RouterModule,
    IonContent,
    ActionButtonComponent,
  ],
})
export class RegistrationComponent {}
