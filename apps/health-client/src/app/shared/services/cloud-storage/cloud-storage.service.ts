import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { RegistrationApiResponseInterface } from 'src/app/features/auth';
import { getUserRoleUtil } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import {
  GlobalApiSuccessResponseInterface,
  PatientRegistrationRequestInterface,
  DoctorRegistrationRequestInterface,
  UpdateResultInterface,
  UpdateUserInfoGroupInterface,
} from 'src/app/shared/models';
import { SHARED_CONSTANT } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class CloudStorageService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/user-profile`;
  private readonly uploadPhotoUrl = 'upload-photo';

  public getPrivatePhotoUrl(
    fileName: string
  ): Observable<GlobalApiSuccessResponseInterface<string>> {
    const { bucketId, bucketName } = environment.bucketInfo;
    const getPhotoBaseUrl = 'get-photo';

    return this.http.get<GlobalApiSuccessResponseInterface<string>>(
      `${this.apiUrl}/${getPhotoBaseUrl}`,
      {
        params: { bucketId, fileName, bucketName },
      }
    );
  }

  public uploadUserPhoto(
    dataWithUserId: GlobalApiSuccessResponseInterface<RegistrationApiResponseInterface>,
    photo: string | File | null,
    userData:
      | PatientRegistrationRequestInterface
      | DoctorRegistrationRequestInterface
  ): Observable<
    GlobalApiSuccessResponseInterface<RegistrationApiResponseInterface>
  > {
    const userId = dataWithUserId?.data?.userId;

    if (userId && photo && photo instanceof File) {
      const uploadPhotoFullUrl = `${this.apiUrl}/${getUserRoleUtil(
        userData.user
      )}/${userId}/${this.uploadPhotoUrl}`;

      const formData = new FormData();
      formData.append('photo', photo);

      return this.http
        .patch<GlobalApiSuccessResponseInterface<UpdateResultInterface>>(
          uploadPhotoFullUrl,
          formData
        )
        .pipe(map(() => dataWithUserId));
    }

    return of(dataWithUserId);
  }

  public updateUserPhoto(
    updateData: UpdateUserInfoGroupInterface
  ): Observable<
    GlobalApiSuccessResponseInterface<UpdateResultInterface>
  > | null {
    const updateGroup = updateData.updateInfoGroup;

    if (
      'personalInfo' in updateGroup &&
      updateGroup.personalInfo?.photo instanceof File
    ) {
      const photo = updateGroup.personalInfo.photo;

      const uploadPhotoFullUrl = `${this.apiUrl}/${updateData.userRole}/${updateData.userId}/${this.uploadPhotoUrl}`;
      const formData = new FormData();
      formData.append('photo', photo);

      return this.http
        .patch<GlobalApiSuccessResponseInterface<UpdateResultInterface>>(
          uploadPhotoFullUrl,
          formData
        )
        .pipe(
          catchError(() =>
            throwError(() => SHARED_CONSTANT.UPDATE_USER_PROFILE_IMAGE_ERROR)
          )
        );
    }

    return null;
  }
}
