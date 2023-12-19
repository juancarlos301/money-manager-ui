import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserType } from '../types';
import { tap } from 'rxjs/operators';

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
        `${process.env['BACK_URL']}/auth/login`,
        body
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('userToken', response?.data?.token);
          return response;
        })
      );
  }
}
