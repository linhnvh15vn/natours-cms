import axiosInstance from '@/api/axios';
import { type AuthData, type SignInBody } from '@/pages/auth/types/auth.types';
import { type HttpResponse } from '@/types';

export const authApi = {
  signIn: async (body: SignInBody) => {
    const response: HttpResponse<AuthData> = await axiosInstance.post(
      '/auth/login',
      body,
    );
    return response.data;
  },
};
