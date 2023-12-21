import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services';

export const noAuthGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const routesWithoutNeedSessionToken = ['login', 'sign-up'];

  if (
    !authService.validSessionToken() &&
    routesWithoutNeedSessionToken.includes(route.routeConfig?.path as string)
  ) {
    return true;
  }

  return router.navigate(['/']);
};
