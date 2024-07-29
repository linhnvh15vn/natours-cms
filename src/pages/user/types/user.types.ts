import { UserRole } from '@/constants/enum';

export type User = {
  name: string;
  email: string;
  photo?: string;
  role: UserRole;
  active?: boolean;
};

export type UserSearchParams = {
  page: number;
  name?: string;
  email?: string;
  role?: UserRole;
};

export type SearchUserFormValues = Omit<UserSearchParams, 'page'>;
