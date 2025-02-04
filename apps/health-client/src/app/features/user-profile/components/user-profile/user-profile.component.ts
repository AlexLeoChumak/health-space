import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { logout } from 'src/app/store/app';
import { selectUser } from 'src/app/store/user';
import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';
import { AddressInfoCardComponent } from 'src/app/shared/components/cards-user-info/address-info-card/address-info-card.component';
import { getUserRole } from 'src/app/shared/utilities/get-user-role.utility';
import { PersonalInfoCardComponent } from 'src/app/shared/components/cards-user-info/personal-info-card/personal-info-card.component';
import { IdentificationInfoCardComponent } from 'src/app/shared/components/cards-user-info/identification-info-card/identification-info-card.component';
import { ContactInfoCardComponent } from 'src/app/shared/components/cards-user-info/contact-info-card/contact-info-card.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

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
