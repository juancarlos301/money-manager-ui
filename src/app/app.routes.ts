import { Routes } from '@angular/router';

import { LoginComponent, HomeComponent, SignUpComponent } from './pages';
import { authGuard, noAuthGuard } from './guards';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: HomeComponent,
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
