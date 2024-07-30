import { QueryKey } from '@/constants/enum';
import { userApi } from '@/pages/user/api/user.api';
import { UserSearchParams } from '@/pages/user/types/user.types';
import { useQuery } from '@tanstack/react-query';

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
