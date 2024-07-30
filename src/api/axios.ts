import axios, { type AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response?.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  },
);

export default axiosInstance;
