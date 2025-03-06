import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  IonCard,
  IonContent,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonToolbar,
  IonButtons,
} from '@ionic/angular/standalone';

import { setIdUserSection } from 'src/app/store/user';
import {
  AddressInfoFormComponent,
  ContactInfoFormComponent,
  EducationMedicalWorkerInfoFormComponent,
  IdentificationBelarusCitizenInfoFormComponent,
  IdentificationForeignCitizenInfoFormComponent,
  MobilePhoneNumberPasswordInfoFormComponent,
  PersonalInfoFormComponent,
  PlaceWorkInfoFormComponent,
} from 'src/app/shared/components';
import { UpdatePasswordFormComponent } from 'src/app/features/user-profile/components/update-password-form/update-password-form.component';

@Component({
  selector: 'health-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButtons,
    IonToolbar,
    ReactiveFormsModule,
    IonIcon,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonContent,
    IonCard,
    CommonModule,
    AddressInfoFormComponent,
    ContactInfoFormComponent,
    EducationMedicalWorkerInfoFormComponent,
    PersonalInfoFormComponent,
    PlaceWorkInfoFormComponent,
    IdentificationBelarusCitizenInfoFormComponent,
    IdentificationForeignCitizenInfoFormComponent,
    MobilePhoneNumberPasswordInfoFormComponent,
    UpdatePasswordFormComponent,
  ],
})
export class EditProfileComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly editProfileForm = new FormGroup({});

  readonly section = toSignal(
    this.route.queryParams.pipe(map((params) => params['section'] || null))
  );

  public ngOnInit(): void {
    this.dispatchSectionIdFromQueryParams();
  }

  private dispatchSectionIdFromQueryParams(): void {
    this.route.queryParams
      .pipe(
        map((params) => params['section-id'] || null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((idUserSection: string) => {
        this.store.dispatch(setIdUserSection({ idUserSection }));
      });
  }

  protected addFormGroup(formGroupName: string, formGroup: FormGroup): void {
    Object.keys(this.editProfileForm.controls).forEach((control) =>
      this.editProfileForm.removeControl(control)
    );

    this.editProfileForm.addControl(formGroupName, formGroup);
  }

  protected onSubmitEditedForm(): void {
    if (this.editProfileForm.valid) {
      const updatedData = this.editProfileForm.value;
      console.log('Данные для сохранения:', updatedData);
      // Здесь можно отправить данные на сервер для сохранения
    } else {
      console.log('Форма содержит ошибки');
    }
  }

  protected goToUserProfilePage(): void {
    this.router.navigate(['/user-profile']);
  }
}
