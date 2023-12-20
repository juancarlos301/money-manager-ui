import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

import { AuthUserType } from '../types';
import { environment } from '../../environments/environment';
type SessionTokenType = {
  createdAt: string;
  email: string;
  exp: number;
  iat: number;
  id: number;
  name: string;
  role: string;
};

type ResponseType<T> = {
  success: boolean;
  data: T;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(body: AuthUserType) {
    return this.http
      .post<ResponseType<{ token: string }>>(
        `${environment.BACK_URL}/auth/log-in`,
        body
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('userToken', response?.data?.token);
          return response;
        })
      );
  }
  logout = () => {
    localStorage.removeItem('userToken');
    window.location.replace('/login');
  };

  getSession = () => {
    return localStorage.getItem('userToken') || '';
  };

  validSessionToken = () => {
    if (this.getCurrentUser()?.exp) {
      return new Date() > new Date(this.getCurrentUser()?.exp);
    }
    return false;
  };

  getCurrentUser = (): SessionTokenType => {
    try {
      return jwtDecode(this.getSession());
    } catch {
      return {} as SessionTokenType;
    }
  };
}
