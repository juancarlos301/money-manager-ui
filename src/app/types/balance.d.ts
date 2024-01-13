import { RegisterType } from './registerType';

export type BalanceResponseType = {
  balance: number;
  totalExpenses: number;
  totalIncomes: number;
  expenses: RegisterType[];
  incomes: RegisterType[];
};
