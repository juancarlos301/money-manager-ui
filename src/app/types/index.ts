export { AuthUserType, SessionTokenType } from './auth';
export { ChangePasswordType } from './changePassword';
export { Example } from './typeModule';
export { TranferDataModalType } from './transferData';
export { ExpensesOrIncomesType } from './expensesOrIncomes';
export { CategoryType } from './categories';
export type ResponseType<T> = {
  success: boolean;
  data: T;
};
