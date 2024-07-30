import { type UserRole } from '@/constants/enum';

export type User = {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role: UserRole;
  active?: boolean;
};

export type UserSearchParams = {
  page?: number;
  name?: string;
  email?: string;
  role?: UserRole;
  all?: boolean;
};

export type SearchUserFormValues = Omit<UserSearchParams, 'page'>;
