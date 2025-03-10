import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { RegistrationApiResponseInterface } from 'src/app/features/auth/models/registration-response.interface'; ////////////
import {
  PatientRegistrationRequestInterface,
  DoctorRegistrationRequestInterface,
  GlobalApiSuccessResponseInterface,
  LoginRequestInterface,
  PatientLoginResponseInterface,
  DoctorLoginResponseInterface,
  PatientInterface,
  DoctorInterface,
} from 'src/app/shared/models';
import {
  CloudStorageService,
  LocalStorageService,
} from 'src/app/shared/services';
import { getUserRole } from 'src/app/shared/utilities';
import { selectAccessToken } from 'src/app/store/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store);
  private readonly authToken = this.store.selectSignal(selectAccessToken);
  private readonly cloudStorageService = inject(CloudStorageService);
  private readonly localStorageService = inject(LocalStorageService);

  public getToken(): string | null {
    return this.authToken() || this.localStorageService.getItem('accessToken');
  }

  public registration(
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
          return this.cloudStorageService.uploadUserPhoto(
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
