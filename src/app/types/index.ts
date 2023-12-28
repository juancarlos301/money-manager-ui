export { AuthUserType, SessionTokenType } from './auth';
export { ChangePasswordType } from './changePassword';
export { Modules } from './typeModule';
export { TranferDataModalType } from './transferData';
export { ExpensesOrIncomesType } from './expensesOrIncomes';


export type ResponseType<T> = {
  success: boolean;
  data: T;
};
