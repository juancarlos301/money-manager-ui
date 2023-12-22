import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


import { ResponseType, ChangePasswordType } from '../types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {

  constructor(private http: HttpClient) { }

  recoverPassword(email: string) {
    return this.http.post<ResponseType<string>>(
      `${environment.BACK_URL}/auth/restore-password/send-email`,
      email
    );
  }

  changePassword(body: ChangePasswordType) {
    return this.http.post<ResponseType<string>>(
      `${environment.BACK_URL}/auth/restore-password`,
      body
    );
  }
  
}
