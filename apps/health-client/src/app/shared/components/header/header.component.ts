import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/angular/standalone';

import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';

@Component({
  selector: 'health-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    ActionButtonComponent,
  ],
})
export class HeaderComponent {}
