import { Routes } from '@angular/router';

import { LoginComponent } from './pages';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
