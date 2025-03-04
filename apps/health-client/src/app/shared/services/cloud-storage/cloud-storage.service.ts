import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { RegistrationApiResponseInterface } from 'src/app/features/auth';
import { getUserRole } from 'src/app/shared/utilities';
import { environment } from 'src/environments/environment';
import {
  GlobalApiSuccessResponseInterface,
  PatientRegistrationRequestInterface,
  DoctorRegistrationRequestInterface,
  UpdateResultInterface,
} from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class CloudStorageService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/user-profile`;

  getPrivatePhotoUrl(
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

  uploadUserPhoto(
    response: GlobalApiSuccessResponseInterface<RegistrationApiResponseInterface>,
    photo: string | File | null,
    userData:
      | PatientRegistrationRequestInterface
      | DoctorRegistrationRequestInterface
  ): Observable<
    GlobalApiSuccessResponseInterface<RegistrationApiResponseInterface>
  > {
    const userId = response?.data?.userId;
    const uploadPhotoBaseUrl = 'upload-photo';

    if (userId && photo && photo instanceof File) {
      const uploadPhotoFullUrl = `${this.apiUrl}/${getUserRole(
        userData.user
      )}/${userId}/${uploadPhotoBaseUrl}`;

      const formData = new FormData();
      formData.append('photo', photo);

      return this.http
        .patch<GlobalApiSuccessResponseInterface<UpdateResultInterface>>(
          uploadPhotoFullUrl,
          formData
        )
        .pipe(map(() => response));
    }

    return of(response);
  }
}
