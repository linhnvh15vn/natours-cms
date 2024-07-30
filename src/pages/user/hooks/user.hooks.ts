import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/constants/enum';
import { userApi } from '@/pages/user/api/user.api';
import { type UserSearchParams } from '@/pages/user/types/user.types';

export const useGetUsers = (params?: UserSearchParams) => {
  return useQuery({
    queryKey: [QueryKey.USERS, params],
    queryFn: () => userApi.getAllUsers(params),
  });
};

export const useGetUserDetails = (_id: string) => {
  return useQuery({
    queryKey: [QueryKey.USERS, _id],
    queryFn: () => userApi.getUserById(_id),
  });
};
