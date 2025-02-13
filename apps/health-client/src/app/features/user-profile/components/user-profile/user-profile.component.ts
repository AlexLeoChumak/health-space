import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import {
  ActionButtonComponent,
  AddressInfoCardComponent,
  PersonalInfoCardComponent,
  IdentificationInfoCardComponent,
  ContactInfoCardComponent,
  EducationMedicalWorkerInfoCardComponent,
  PlaceWorkInfoCardComponent,
} from 'src/app/shared/components';
import { getUserRole } from 'src/app/shared/utilities';
import { logout } from 'src/app/store/app';
import { selectUser } from 'src/app/store/user';
import { FooterComponent } from 'src/app/features/footer';

@Component({
  selector: 'health-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonRow,
    IonGrid,
    IonCol,
    CommonModule,
    IonContent,
    ActionButtonComponent,
    AddressInfoCardComponent,
    PersonalInfoCardComponent,
    IdentificationInfoCardComponent,
    ContactInfoCardComponent,
    EducationMedicalWorkerInfoCardComponent,
    PlaceWorkInfoCardComponent,
    FooterComponent,
  ],
})
export class UserProfileComponent {
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly userRole = computed(() => {
    const currentUser = this.user();
    return currentUser ? getUserRole(currentUser) : null;
  });

  protected onLogout() {
    this.store.dispatch(logout());
  }
}
