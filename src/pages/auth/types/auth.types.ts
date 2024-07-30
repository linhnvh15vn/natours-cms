import { type User } from '@/pages/user/types/user.types';

export type AuthData = {
  token: string;
  user: User;
};

export type SignInBody = {
  email: string;
  password: string;
};
