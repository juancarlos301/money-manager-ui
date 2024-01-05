import { Routes } from '@angular/router';

import {
  LoginComponent,
  HomeComponent,
  SignUpComponent,
  AdminComponent,
} from './pages';
import { authGuard, noAuthGuard } from './guards';
import { InfoComponent } from './pages/info';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    data: { allowRoles: ['client', 'admin'] },
    component: HomeComponent,
  },
  {
    path: 'info/:index',
    canActivate: [authGuard],
    data: { allowRoles: ['client', 'admin'] },
    component: InfoComponent,
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
