import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { RegisterType, ResponseType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}

  getAllIncomes() {
    return this.http.post<ResponseType<RegisterType>>(
      `${environment.BACK_URL}/incomes/getAll`,
      {}
    );
  }

  addIncome(body: RegisterType) {
    return this.http.post<ResponseType<string>>(
      `${environment.BACK_URL}/incomes/create`,
      body
    );
  }

  editIncome(body: RegisterType) {
    return this.http.put<ResponseType<string>>(
      `${environment.BACK_URL}/incomes/update`,
      body
    );
  }

  deleteIncome(body: { body: RegisterType; deleted: true }) {
    return this.http.put<ResponseType<string>>(
      `${environment.BACK_URL}/incomes/update`,
      body
    );
  }
}
