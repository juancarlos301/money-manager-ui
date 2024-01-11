export { AuthUserType, SessionTokenType } from './auth';
export { ChangePasswordType } from './changePassword';
export { CategoryPurpose } from './typeModule';
export { TranferDataModalType } from './transferData';
export { RegisterType } from './registerType';
export { CategoryType } from './categoryType';
export { BalanceResponseType } from './balance';

export type ResponseType<T> = {
  success: boolean;
  data: T;
};
