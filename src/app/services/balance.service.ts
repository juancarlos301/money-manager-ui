import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResponseType, BalanceResponseType } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private http: HttpClient) {}

  getBalance(body: { start_date: string; end_date: string }) {
    return this.http.post<ResponseType<BalanceResponseType>>(
      `${environment.BACK_URL}/balance`,
      body
    );
  }
}
