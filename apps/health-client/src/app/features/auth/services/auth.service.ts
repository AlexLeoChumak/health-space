import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

import { RegistrationApiResponseInterface } from 'src/app/features/auth/models/registration-response.interface';
import { DoctorRegistrationRequestInterface } from 'src/app/shared/models/doctor/doctor-registration-request.interface';
import { PatientRegistrationRequestInterface } from 'src/app/shared/models/patient/patient-registration-request.interface';
import { LoginRequestInterface } from 'src/app/shared/models/login-request.interface';
import { environment } from 'src/environments/environment';
import { PatientLoginResponseInterface } from 'src/app/shared/models/patient/patient-login-response.interface';
import { DoctorLoginResponseInterface } from 'src/app/shared/models/doctor/doctor-login-response.interface';
import { GlobalApiSuccessResponseInterface } from 'src/app/shared/models/global-api-success-response.interface';
import { UserPhotoService } from 'src/app/shared/services/user-photo/user-photo.service';
import { getUserRole } from 'src/app/shared/utils/get-user-role.utility';
import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';
import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly userPhotoService = inject(UserPhotoService);

  registration(
    userData:
      | PatientRegistrationRequestInterface
      | DoctorRegistrationRequestInterface
  ): Observable<
    GlobalApiSuccessResponseInterface<RegistrationApiResponseInterface>
  > {
    const registrationBaseUrl = 'auth/registration';

    const fullUrl = `${
      environment.apiBaseUrl
    }/${registrationBaseUrl}/${getUserRole(userData.user)}`;

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
      .post<
        GlobalApiSuccessResponseInterface<RegistrationApiResponseInterface>
      >(fullUrl, requestData)
      .pipe(
        switchMap((response) => {
          return this.userPhotoService.uploadUserPhoto(
            response,
            photo,
            userData
          );
        })
      );
  }

  public login(
    loginData: LoginRequestInterface,
    isDoctor: boolean
  ): Observable<
    GlobalApiSuccessResponseInterface<
      PatientLoginResponseInterface | DoctorLoginResponseInterface
    >
  > {
    const loginBaseUrl = 'auth/login';
    const role = isDoctor ? 'doctor' : 'patient';
    const fullUrl = `${environment.apiBaseUrl}/${loginBaseUrl}/${role}`;

    return this.http.post<
      GlobalApiSuccessResponseInterface<
        PatientLoginResponseInterface | DoctorLoginResponseInterface
      >
    >(fullUrl, loginData);
  }

  public validateToken(
    accessToken: string
  ): Observable<PatientInterface | DoctorInterface> {
    const validateTokenUrl = 'auth/validate-token';
    const fullUrl = `${environment.apiBaseUrl}/${validateTokenUrl}`;

    return this.http
      .post<
        GlobalApiSuccessResponseInterface<
          PatientLoginResponseInterface | DoctorLoginResponseInterface
        >
      >(fullUrl, {
        accessToken,
      })
      .pipe(map((response) => response.data.user));
  }

  public refreshToken(
    accessToken: string
  ): Observable<PatientLoginResponseInterface | DoctorLoginResponseInterface> {
    const validateTokenUrl = 'auth/refresh-token';
    const fullUrl = `${environment.apiBaseUrl}/${validateTokenUrl}`;

    return this.http
      .post<
        GlobalApiSuccessResponseInterface<
          PatientLoginResponseInterface | DoctorLoginResponseInterface
        >
      >(fullUrl, {
        accessToken,
      })
      .pipe(map((response) => response.data));
  }
}
