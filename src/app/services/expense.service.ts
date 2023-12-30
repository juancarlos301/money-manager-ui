import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { RegisterType, ResponseType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getAllExpenses() {
    return this.http.post<ResponseType<RegisterType>>(
      `${environment.BACK_URL}/expenses/getAll`,
      {}
    );
  }

  addExpense(body: RegisterType) {
    return this.http.post<ResponseType<string>>(
      `${environment.BACK_URL}/expenses/create`,
      body
    );
  }

  editExpense(body: RegisterType) {
    return this.http.put<ResponseType<string>>(
      `${environment.BACK_URL}/expenses/update`,
      body
    );
  }

  deleteExpense(body: { body: RegisterType; deleted: true }) {
    return this.http.put<ResponseType<string>>(
      `${environment.BACK_URL}/expenses/update`,
      body
    );
  }
}
