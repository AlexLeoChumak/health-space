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
import { catchError, map, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  IonCard,
  IonContent,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonToolbar,
  IonButtons,
  IonItem,
  IonBackButton,
} from '@ionic/angular/standalone';
import { loadUser, selectUser, setIdUserInfoGroup } from 'src/app/store/user';
import { UpdatePasswordFormComponent } from 'src/app/features/user-profile/components/update-password-form/update-password-form.component';
import { SHARED_CONSTANT } from 'src/app/shared/constants';
import { ToastService } from 'src/app/shared/services';
import { deepEqualUtil, getUserRoleUtil } from 'src/app/shared/utils';
import { UpdateUserProfileService } from 'src/app/features/user-profile/service/update-user-profile/update-user-profile.service';
import { UPDATE_INFO_CONSTANT } from 'src/app/features/user-profile';
import { HttpErrorResponse } from '@angular/common/http';
import { selectIsLoading, setLoading } from 'src/app/store/app';
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
import {
  GlobalApiSuccessResponseInterface,
  UpdateUserInfoGroupInterface,
  UpdateUserInfoGroupType,
} from 'src/app/shared/models';
import { CurrentUserPhotoDataInterface } from 'src/app/shared/models/current-user-photo-data.interface';

@Component({
    selector: 'health-update-user-profile',
    templateUrl: './update-user-profile.component.html',
    styleUrl: './update-user-profile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        IonBackButton,
        IonItem,
        IonButtons,
        IonToolbar,
        ReactiveFormsModule,
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
    ]
})
export class UpdateProfileComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly user = this.store.selectSignal(selectUser);
  protected readonly isLoading = this.store.selectSignal(selectIsLoading);
  private readonly updateUserProfileService = inject(UpdateUserProfileService);
  private readonly toastService = inject(ToastService);
  protected readonly editProfileForm = new FormGroup({});
  private readonly destroyRef = inject(DestroyRef);

  readonly section = toSignal(
    this.route.queryParams.pipe(map((params) => params['group'] || null))
  );

  public ngOnInit(): void {
    this.dispatchSectionIdFromQueryParams();
  }

  private dispatchSectionIdFromQueryParams(): void {
    this.route.queryParams
      .pipe(
        map((params) => params['group-id'] || null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((idUserInfoGroup: string) => {
        this.store.dispatch(setIdUserInfoGroup({ idUserInfoGroup }));
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

    const user = this.user();
    const rawValue = this.editProfileForm.value;

    const keys = Object.keys(rawValue) as (keyof typeof rawValue)[];
    if (keys.length !== 1) {
      this.toastService.presentToast(UPDATE_INFO_CONSTANT.EDIT_INFO_ERROR);
      return;
    }

    const keyNameInfoGroup = keys[0];

    if (!user) {
      this.toastService.presentToast(SHARED_CONSTANT.USER_NOT_FOUND_ERROR);
      return;
    }

    const userInfoGroup = user[keyNameInfoGroup];
    let userWithoutId;

    if (userInfoGroup && typeof userInfoGroup === 'object')
      userWithoutId = Object.fromEntries(
        Object.entries(userInfoGroup).filter(([key]) => key !== 'id')
      );

    if (user && deepEqualUtil(rawValue[keyNameInfoGroup], userWithoutId)) {
      this.toastService.presentToast(SHARED_CONSTANT.UPDATE_INFO_SUCCESSFULLY);
      return;
    }

    const updateInfoGroup: UpdateUserInfoGroupType =
      rawValue as UpdateUserInfoGroupType;

    const userId = user.id;
    const userRole = getUserRoleUtil(user);

    if (!userId || !userRole) {
      this.toastService.presentToast(SHARED_CONSTANT.USER_NOT_FOUND_ERROR);
      return;
    }

    let currentUserPhotoData: CurrentUserPhotoDataInterface = {
      name: null,
      id: null,
    };

    if (
      keyNameInfoGroup === 'personalInfo' &&
      typeof user.personalInfo.photo === 'string'
    ) {
      currentUserPhotoData = {
        name: user.personalInfo.photo,
        id: user.personalInfo.photoId,
      };
    }

    const updateData: UpdateUserInfoGroupInterface = {
      updateInfoGroup,
      userId,
      userRole,
      currentUserPhotoData,
    };

    this.toggleLoader(true);
    this.updateUserProfileService
      .updateInfoGroup(updateData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastService.presentToast(error.error.message);
          this.toggleLoader(false);
          return throwError(() => error);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((success: GlobalApiSuccessResponseInterface<string>) => {
        this.toastService.presentToast(success.data);
        this.store.dispatch(loadUser());
        this.toggleLoader(false);
      });
  }

  private toggleLoader(value: boolean): void {
    if (value) {
      this.store.dispatch(setLoading({ isLoading: value }));
    } else {
      this.store.dispatch(setLoading({ isLoading: value }));
    }
  }

  protected goToUserProfilePage(): void {
    this.router.navigate(['/user-profile']);
  }
}
