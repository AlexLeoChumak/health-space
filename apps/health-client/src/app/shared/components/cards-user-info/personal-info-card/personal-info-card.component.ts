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
  IonTitle,
  IonButton,
  IonIcon,
  IonToolbar,
  IonButtons,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import {
  selectUser,
  selectUserRole,
  selectUrlUserPhoto,
} from 'src/app/store/user';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { selectIsLoading } from 'src/app/store/app';

@Component({
    selector: 'health-personal-info-card',
    templateUrl: './personal-info-card.component.html',
    styleUrl: './personal-info-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        IonSkeletonText,
        IonButtons,
        IonToolbar,
        IonIcon,
        IonButton,
        IonTitle,
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
    ]
})
export class PersonalInfoCardComponent {
  private readonly navigationService = inject(NavigationService);
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly userRole = this.store.selectSignal(selectUserRole);
  protected readonly urlUserPhoto = this.store.selectSignal(selectUrlUserPhoto);
  protected readonly isLoading = this.store.selectSignal(selectIsLoading);

  protected navigateToUpdatePage(section: string): void {
    const sectionId = this.user()?.personalInfo.id;
    if (sectionId)
      this.navigationService.navigateToUpdatePage(section, sectionId);
  }
}
