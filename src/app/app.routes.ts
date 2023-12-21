import { Routes } from '@angular/router';

import {
  LoginComponent,
  HomeComponent,
  SignUpComponent,
  AdminComponent,
} from './pages';
import { authGuard, noAuthGuard } from './guards';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    data: { allowRoles: ['client', 'admin'] },
    component: HomeComponent,
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { allowRoles: ['admin'] },
    component: AdminComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
