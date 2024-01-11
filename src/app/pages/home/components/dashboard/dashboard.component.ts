import { Component, OnInit } from '@angular/core';

import { AngularMaterialModule, AngularCommonModule } from '../../../../shared';
import { LineChartComponent } from '../line-chart';
import { DoughnutChartComponent } from '../doughnut-chart';
import { BalanceService } from '../../../../services/balance.service';
import { BalanceResponseType } from '../../../../types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AngularMaterialModule,
    AngularCommonModule,
    LineChartComponent,
    DoughnutChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  data: BalanceResponseType = {} as BalanceResponseType;
  totalExpenses: number = 0;
  totalIncomes: number = 0;
  balance: number = 0;

  loading = false;

  constructor(private _balanceService: BalanceService) {}
  ngOnInit(): void {
    this.getBalance();
  }

  getBalance() {
    this.loading = true;
    this._balanceService
      .getBalance({
        start_date: new Date().toDateString(),
        end_date: new Date().toDateString(),
      })
      .subscribe({
        next: ({ data }) => {
          this.data = data;
          this.totalExpenses = data.totalExpenses;
          this.totalIncomes = data.totalIncomes;
          this.balance = data.balance;
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
        },
      });
  }
}
