import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCardContent,
  IonCard,
  IonLabel,
  IonCardTitle,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonText,
  IonCardHeader,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { selectUrlUserPhoto, selectUser } from 'src/app/store/user';

@Component({
  selector: 'health-personal-info-card',
  templateUrl: './personal-info-card.component.html',
  styleUrl: './personal-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCardHeader,
    IonText,
    IonImg,
    IonAvatar,
    IonItem,
    IonList,
    IonCardTitle,
    IonLabel,
    IonCard,
    IonCardContent,
    CommonModule,
  ],
})
export class PersonalInfoCardComponent {
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly urlUserPhoto = this.store.selectSignal(selectUrlUserPhoto);
}
