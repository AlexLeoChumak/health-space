import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth/auth.service';

export const authGuard: CanActivateFn = (): boolean => {
  const authService = inject(AuthService);
  return !!authService.getToken();
};
