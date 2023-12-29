import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ExpensesOrIncomesType, ResponseType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}

  getAllIncomes() {
    return this.http.post<ResponseType<ExpensesOrIncomesType>>(
      `${environment.BACK_URL}/incomes/getAll`,
      {}
    );
  }

  addIncome(body: ExpensesOrIncomesType) {
    return this.http.post<ResponseType<string>>(
      `${environment.BACK_URL}/incomes/create`,
      body
    );
  }

  editIncome(body: ExpensesOrIncomesType) {
    return this.http.put<ResponseType<string>>(
      `${environment.BACK_URL}/incomes/update`,
      body
    );
  }

  deleteIncome(body: { body: ExpensesOrIncomesType; deleted: true }) {
    return this.http.put<ResponseType<string>>(
      `${environment.BACK_URL}/incomes/update`,
      body
    );
  }
}
