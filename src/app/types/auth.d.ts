export type AuthUserType = {
  id?: number;
  name: string;
  email: string;
  role: string;
  password: string;
};

export type SessionTokenType = {
  createdAt: string;
  email: string;
  exp: number;
  iat: number;
  id: number;
  name: string;
  role: string;
};
