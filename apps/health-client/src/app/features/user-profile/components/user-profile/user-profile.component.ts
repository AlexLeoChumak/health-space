import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import {
  AddressInfoCardComponent,
  PersonalInfoCardComponent,
  ContactInfoCardComponent,
  EducationMedicalWorkerInfoCardComponent,
  PlaceWorkInfoCardComponent,
  IdentificationBelarusCitizenInfoCardComponent,
  IdentificationForeignCitizenInfoCardComponent,
  MobilePhoneNumberPasswordInfoCardComponent,
} from 'src/app/shared/components';
import { getUserRoleUtil } from 'src/app/shared/utils';
import { logout } from 'src/app/store/app';
import { selectUser } from 'src/app/store/user';
import { FooterComponent } from 'src/app/features/footer';

@Component({
    selector: 'health-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        IonContent,
        AddressInfoCardComponent,
        PersonalInfoCardComponent,
        ContactInfoCardComponent,
        EducationMedicalWorkerInfoCardComponent,
        PlaceWorkInfoCardComponent,
        FooterComponent,
        IdentificationBelarusCitizenInfoCardComponent,
        IdentificationForeignCitizenInfoCardComponent,
        MobilePhoneNumberPasswordInfoCardComponent,
    ]
})
export class UserProfileComponent {
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly userRole = computed(() => {
    const currentUser = this.user();
    return currentUser ? getUserRoleUtil(currentUser) : null;
  });

  protected onLogout() {
    this.store.dispatch(logout());
  }
}
