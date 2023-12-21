import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services';
import { chPerm } from '../helpers';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // console.log(route.data['allowRoles'], authService.userInfo);

  if (
    authService.validSessionToken() &&
    chPerm(route.data['allowRoles'], authService.userInfo)
  ) {
    return true;
  }

  return router.navigate(['/login']);
};
