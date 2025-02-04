import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { RegistrationApiResponseInterface } from 'src/app/features/auth/models/registration-response.interface';
import { DoctorRegistrationRequestInterface } from 'src/app/shared/models/doctor/doctor-registration-request.interface';
import { GlobalApiSuccessResponseInterface } from 'src/app/shared/models/global-api-success-response.interface';
import { PatientRegistrationRequestInterface } from 'src/app/shared/models/patient/patient-registration-request.interface';
import { UpdateResultInterface } from 'src/app/shared/models/update-result.interface';
import { getUserRole } from 'src/app/shared/utilities/get-user-role.utility';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserPhotoService {
  private readonly http = inject(HttpClient);

  uploadUserPhoto(
    response: GlobalApiSuccessResponseInterface<RegistrationApiResponseInterface>,
    photo: string | File | null,
    userData:
      | PatientRegistrationRequestInterface
      | DoctorRegistrationRequestInterface
  ): Observable<
    GlobalApiSuccessResponseInterface<RegistrationApiResponseInterface>
  > {
    const userProfileBaseUrl = 'user-profile';
    const uploadPhotoBaseUrl = 'upload-photo';

    const userId = response?.data?.userId;

    if (userId && photo && photo instanceof File) {
      const uploadPhotoFullUrl = `${
        environment.apiBaseUrl
      }/${userProfileBaseUrl}/${getUserRole(
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
