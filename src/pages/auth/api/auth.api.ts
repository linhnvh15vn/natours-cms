import axiosInstance from '@/api/axios';
import { AuthData, SignInBody } from '@/pages/auth/types/auth.types';
import { HttpResponse } from '@/types';

export const authApi = {
  signIn: async (body: SignInBody) => {
    const response: HttpResponse<AuthData> = await axiosInstance.post(
      '/auth/login',
      body,
    );
    return response.data;
  },
};
