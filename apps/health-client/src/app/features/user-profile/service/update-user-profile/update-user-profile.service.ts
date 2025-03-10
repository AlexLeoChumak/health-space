import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserInfoGroupInterface } from 'src/app/features/user-profile';
import { UpdatePasswordFormInterface } from 'src/app/features/user-profile/models/update-password.interface';
import { GlobalApiSuccessResponseInterface } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserProfileService {
  private readonly http = inject(HttpClient);

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

    return this.http.put<GlobalApiSuccessResponseInterface<string>>(
      updateInfoUrl,
      updateData
    );
  }
}
