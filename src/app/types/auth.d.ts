export type LoginResponseType = { token: string; message: string };

export type AuthUserType = {
  id?: number;
  name: string;
  email: string;
  role: string;
  password: string;
};
