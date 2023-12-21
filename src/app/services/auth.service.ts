import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

import { AuthUserType, ResponseType, SessionTokenType } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: SessionTokenType = {} as SessionTokenType;
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
          this.userInfo = this.getCurrentUser();
          return response;
        })
      );
  }
  logout = () => {
    localStorage.removeItem('userToken');
    window.location.replace('/login');
  };

  singup = (body: AuthUserType) => {
    return this.http.post<ResponseType<{ user: AuthUserType }>>(
      `${environment.BACK_URL}/auth/create`,
      body
    );
  };

  getAllUsers = (body?: { role?: string }) => {
    return this.http.post<{ users: AuthUserType[] }>(
      `${environment.BACK_URL}/auth/getAll`,
      body
    );
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

  checkCurrentUserInfo() {
    this.userInfo = this.getCurrentUser();
  }
}
