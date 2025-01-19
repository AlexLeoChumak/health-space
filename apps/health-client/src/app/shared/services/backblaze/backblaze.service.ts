import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalApiSuccessResponseInterface } from 'src/app/shared/models/global-api-success-response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackblazeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/backblaze`;

  authorize(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/authorize`);
  }

  getPrivatePhotoUrl(
    fileName: string
  ): Observable<GlobalApiSuccessResponseInterface<string>> {
    const { bucketId, bucketName } = environment.bucketInfo;

    return this.http.get<GlobalApiSuccessResponseInterface<string>>(
      `${this.apiUrl}/user-photo`,
      {
        params: { bucketId, fileName, bucketName },
      }
    );
  }
}
