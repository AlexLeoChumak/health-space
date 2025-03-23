import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { UpdatePasswordFormInterface } from 'src/app/features/user-profile/models/update-password.interface';
import {
  DoctorInterface,
  GlobalApiSuccessResponseInterface,
  PatientInterface,
  UpdateUserInfoGroupInterface,
} from 'src/app/shared/models';
import { CloudStorageService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserProfileService {
  private readonly http = inject(HttpClient);
  private readonly cloudStorageService = inject(CloudStorageService);

  public getUserInfo(): Observable<
    GlobalApiSuccessResponseInterface<PatientInterface | DoctorInterface>
  > {
    const getUserInfoUrl = `${environment.apiBaseUrl}/user-profile/get-info`;
    return this.http.get<
      GlobalApiSuccessResponseInterface<PatientInterface | DoctorInterface>
    >(getUserInfoUrl);
  }

  public updatePassword(
    updateData: UpdatePasswordFormInterface
  ): Observable<GlobalApiSuccessResponseInterface<string>> {
    const updatePasswordUrl = `${environment.apiBaseUrl}/user-profile/update-password`;

    return this.http.patch<GlobalApiSuccessResponseInterface<string>>(
      updatePasswordUrl,
      updateData
    );
  }

  public updateInfoGroup(
    updateData: UpdateUserInfoGroupInterface
  ): Observable<GlobalApiSuccessResponseInterface<string>> {
    const updateInfoUrl = `${environment.apiBaseUrl}/user-profile/update-info-group`;
    const isPersonalInfo = 'personalInfo' in updateData.updateInfoGroup;

    return (
      isPersonalInfo
        ? this.cloudStorageService
            .updateUserPhoto(updateData)
            ?.pipe(map(() => null)) ?? of(null)
        : of(null)
    ).pipe(
      switchMap(() => {
        let updateDataWithUpdatedUserPhoto;

        if (isPersonalInfo) {
          const updateInfoGroup = updateData.updateInfoGroup as {
            personalInfo: { photo: File };
          };

          const newFileNameUserPhoto = updateInfoGroup.personalInfo.photo.name;

          updateDataWithUpdatedUserPhoto = structuredClone(updateData);

          (
            updateDataWithUpdatedUserPhoto.updateInfoGroup as {
              personalInfo: { photo: string };
            }
          ).personalInfo.photo = newFileNameUserPhoto;
        }

        return this.http.put<GlobalApiSuccessResponseInterface<string>>(
          updateInfoUrl,
          isPersonalInfo ? updateDataWithUpdatedUserPhoto : updateData
        );
      })
    );
  }
}
