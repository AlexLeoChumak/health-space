import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/user';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'health-contact-info-card',
  templateUrl: './contact-info-card.component.html',
  styleUrl: './contact-info-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonText,
    IonLabel,
    IonItem,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    CommonModule,
  ],
})
export class ContactInfoCardComponent {
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
}
