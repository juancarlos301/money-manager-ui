export { AuthUserType, SessionTokenType } from './auth';

export type ResponseType<T> = {
  success: boolean;
  data: T;
};
