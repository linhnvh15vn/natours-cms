import axiosInstance from '@/api/axios';
import { type User, type UserSearchParams } from '@/pages/user/types/user.types';
import { type HttpResponse, type PaginatedData } from '@/types';

export const userApi = {
  getAllUsers: async (params?: UserSearchParams) => {
    const response: HttpResponse<PaginatedData<User>> = await axiosInstance.get(
      'users',
      { params },
    );
    return response.data;
  },

  getUserById: async (_id: string) => {
    const response: HttpResponse<User> = await axiosInstance.get(
      `/users/${_id}`,
    );
    return response.data;
  },
};
