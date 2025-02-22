import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);

  editUserInfo(section: string, sectionId: string): void {
    this.router.navigate(['/user-profile/edit'], {
      queryParams: { section, 'section-id': sectionId },
    });
  }
}
