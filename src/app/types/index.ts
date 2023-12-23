export { AuthUserType, SessionTokenType } from './auth';
export { ChangePasswordType } from './changePassword';

export type ResponseType<T> = {
  success: boolean;
  data: T;
};
