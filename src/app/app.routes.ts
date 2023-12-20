import { Routes } from '@angular/router';

import { LoginComponent, HomeComponent } from './pages';
import { authGuard } from './guards';

export const routes: Routes = [
  { path: '', canActivate: [authGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
