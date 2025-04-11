import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonToolbar,
  IonTitle,
  IonRouterOutlet,
  IonIcon,
  IonSplitPane,
  IonMenu,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'health-setting-user-profile',
    templateUrl: './setting-user-profile.component.html',
    styleUrl: './setting-user-profile.component.scss',
    imports: [
        CommonModule,
        RouterModule,
        IonSplitPane,
        IonIcon,
        IonRouterOutlet,
        IonTitle,
        IonToolbar,
        IonList,
        IonItem,
        IonHeader,
        IonContent,
        IonMenu,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingUserProfileComponent {}
