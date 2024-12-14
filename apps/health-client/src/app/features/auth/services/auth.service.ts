import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';

import { RegistrationApiResponseInterface } from 'src/app/features/auth/models/registration-response.interface';
import { GlobalApiResponseInterface } from 'src/app/shared/models/global-api-response.interface';
import { UpdateResultInterface } from 'src/app/shared/models/update-result.interface';
import { DoctorRegistrationRequestInterface } from 'src/app/shared/models/doctor/doctor-registration-request.interface';
import { PatientRegistrationRequestInterface } from 'src/app/shared/models/patient/patient-registration-request.interface';
import { LoginRequestInterface } from 'src/app/features/auth/models/login-request.interface';
import { environment } from 'src/environments/environment';
import { PatientLoginResponseInterface } from 'src/app/shared/models/patient/patient-login-response.interface';
import { DoctorLoginResponseInterface } from 'src/app/shared/models/doctor/doctor-login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  private isDoctor(
    userData:
      | PatientRegistrationRequestInterface
      | DoctorRegistrationRequestInterface
  ): boolean {
    return 'placeWorkInfo' in userData.user;
  }

  registration(
    userData:
      | PatientRegistrationRequestInterface
      | DoctorRegistrationRequestInterface
  ): Observable<GlobalApiResponseInterface<RegistrationApiResponseInterface>> {
    const registrationBaseUrl = 'auth/registration';

    const fullUrl = `${environment.apiBaseUrl}/${registrationBaseUrl}/${
      this.isDoctor(userData) ? 'doctor' : 'patient'
    }`;

    let photo: string | File | null;
    let personalInfo;

    if ('personalInfo' in userData.user) {
      photo = userData.user.personalInfo?.photo;
      personalInfo = { ...userData.user.personalInfo, photo: null };
    }

    const requestData = {
      ...userData,
      user: {
        ...userData.user,
        personalInfo: personalInfo,
      },
    };

    return this.http
      .post<GlobalApiResponseInterface<RegistrationApiResponseInterface>>(
        fullUrl,
        requestData
      )
      .pipe(
        switchMap((response) => {
          return this.uploadUserPhoto(response, photo, userData);
        })
      );
  }

  uploadUserPhoto(
    response: GlobalApiResponseInterface<RegistrationApiResponseInterface>,
    photo: string | File | null,
    userData:
      | PatientRegistrationRequestInterface
      | DoctorRegistrationRequestInterface
  ): Observable<GlobalApiResponseInterface<RegistrationApiResponseInterface>> {
    const userProfileBaseUrl = 'user-profile';
    const uploadPhotoBaseUrl = 'upload-photo';

    const userId = response?.data?.userId;

    if (userId && photo && photo instanceof File) {
      const uploadPhotoFullUrl = `${
        environment.apiBaseUrl
      }/${userProfileBaseUrl}/${
        this.isDoctor(userData) ? 'doctor' : 'patient'
      }/${userId}/${uploadPhotoBaseUrl}`;

      const formData = new FormData();
      formData.append('photo', photo);

      return this.http
        .patch<GlobalApiResponseInterface<UpdateResultInterface>>(
          uploadPhotoFullUrl,
          formData
        )
        .pipe(map(() => response));
    }

    return of(response);
  }

  public login(
    loginData: LoginRequestInterface,
    isDoctor: boolean
  ): Observable<
    GlobalApiResponseInterface<
      PatientLoginResponseInterface | DoctorLoginResponseInterface
    >
  > {
    const loginBaseUrl = 'auth/login';

    const fullUrl = `${environment.apiBaseUrl}/${loginBaseUrl}/${
      isDoctor ? 'doctor' : 'patient'
    }`;

    return this.http.post<
      GlobalApiResponseInterface<
        PatientLoginResponseInterface | DoctorLoginResponseInterface
      >
    >(fullUrl, loginData);
  }
}
