import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StringConverterService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);

  public editUserInfo(section: string, sectionId: string): void {
    const sectionKebabCase = StringConverterService.camelToKebab(section);

    this.router.navigate(['/user-profile/edit'], {
      queryParams: { section: sectionKebabCase, 'section-id': sectionId },
    });
  }
}
