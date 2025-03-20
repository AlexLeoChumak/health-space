import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StringConverterService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);

  public navigateToUpdatePage(
    nameInfoGroup: string,
    idInfoGroup: string
  ): void {
    const sectionKebabCase = StringConverterService.camelToKebab(nameInfoGroup);

    this.router.navigate(['/user-profile/update'], {
      queryParams: { group: sectionKebabCase, 'group-id': idInfoGroup },
    });
  }
}
