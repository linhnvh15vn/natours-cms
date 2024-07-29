import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/pages/auth/api/auth.api';

export const useSignIn = () => {
  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
  });
};
