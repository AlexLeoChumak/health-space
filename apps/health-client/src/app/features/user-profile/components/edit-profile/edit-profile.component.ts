import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, throwError } from 'rxjs';
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
  IonItem,
} from '@ionic/angular/standalone';

import { loadUser, selectUser, setIdUserSection } from 'src/app/store/user';
import {
  ActionButtonComponent,
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
import { setLoading } from 'src/app/store/app';
import { SHARED_CONSTANT } from 'src/app/shared/constants';
import { ToastService } from 'src/app/shared/services';
import { getUserRole } from 'src/app/shared/utilities';
import { UpdateUserProfileService } from 'src/app/features/user-profile/service/update-user-profile/update-user-profile.service';
import {
  UPDATE_INFO_CONSTANT,
  UpdateUserInfoGroupInterface,
  UpdateUserInfoGroupType,
} from 'src/app/features/user-profile';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'health-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonItem,
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
    ActionButtonComponent,
  ],
})
export class EditProfileComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly user = this.store.selectSignal(selectUser);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly updateUserProfileService = inject(UpdateUserProfileService);
  private readonly toastService = inject(ToastService);
  protected readonly editProfileForm = new FormGroup({});
  protected readonly isSubmittingForm = signal(false);
  private readonly destroyRef = inject(DestroyRef);

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

  protected onSubmitUpdateFormGroup(): void {
    if (this.editProfileForm.invalid) return;

    this.isSubmittingForm.set(true);
    this.store.dispatch(setLoading({ isLoading: true }));

    const validKeys: string[] = [
      'personalInfo',
      'contactInfo',
      'mobilePhoneNumberPasswordInfo',
      'identificationBelarusCitizenInfo',
      'identificationForeignCitizenInfo',
      'addressRegistrationInfo',
      'addressResidenceInfo',
      'addressMedicalInstitutionInfo',
      'educationMedicalWorkerInfo',
      'placeWorkInfo',
    ];

    const rawValue = this.editProfileForm.getRawValue();
    const keys = Object.keys(rawValue);

    if (keys.length !== 1) {
      this.toastService.presentToast(UPDATE_INFO_CONSTANT.EDIT_INFO_ERROR);
      this.isSubmittingForm.set(false);
      this.store.dispatch(setLoading({ isLoading: false }));
      return;
    }

    const keyNameInfoGroup = keys[0];

    if (!validKeys.includes(keyNameInfoGroup)) {
      this.toastService.presentToast(UPDATE_INFO_CONSTANT.EDIT_INFO_ERROR);
      this.isSubmittingForm.set(false);
      this.store.dispatch(setLoading({ isLoading: false }));
      return;
    }
    const updateInfoGroup: UpdateUserInfoGroupType =
      rawValue as UpdateUserInfoGroupType;
    const user = this.user();

    if (!user) {
      this.toastService.presentToast(SHARED_CONSTANT.USER_NOT_FOUND_ERROR);
      this.isSubmittingForm.set(false);
      this.store.dispatch(setLoading({ isLoading: false }));
      return;
    }

    const userId = user.id;
    const userRole = getUserRole(user);

    if (!userId || !userRole) {
      this.toastService.presentToast(SHARED_CONSTANT.USER_NOT_FOUND_ERROR);
      this.isSubmittingForm.set(false);
      this.store.dispatch(setLoading({ isLoading: false }));
      return;
    }

    const updateData: UpdateUserInfoGroupInterface = {
      updateInfoGroup,
      userId,
      userRole,
    };

    this.updateUserProfileService
      .updateInfoGroup(updateData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastService.presentToast(error.error.message);
          this.store.dispatch(setLoading({ isLoading: false }));
          this.isSubmittingForm.set(false);
          return throwError(() => error);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((success) => {
        this.store.dispatch(setLoading({ isLoading: false }));
        this.store.dispatch(loadUser());
        this.toastService.presentToast(success.data);
        this.isSubmittingForm.set(false);
      });
  }

  protected goToUserProfilePage(): void {
    this.router.navigate(['/user-profile']);
  }
}
