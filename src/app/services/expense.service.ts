import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ExpensesOrIncomesType, ResponseType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getAllExpenses() {
    return this.http.post<ResponseType<ExpensesOrIncomesType>>(
      `${environment.BACK_URL}/expenses/getAll`,
      {}
    );
  }

  addExpense(body: ExpensesOrIncomesType) {
    return this.http.post<ResponseType<string>>(
      `${environment.BACK_URL}/expenses/create`,
      body
    );
  }

  editExpense(body: ExpensesOrIncomesType) {
    return this.http.put<ResponseType<string>>(
      `${environment.BACK_URL}/expenses/update`,
      body
    );
  }

  deleteExpense(body: { body: ExpensesOrIncomesType; deleted: true }) {
    return this.http.put<ResponseType<string>>(
      `${environment.BACK_URL}/expenses/update`,
      body
    );
  }
}
