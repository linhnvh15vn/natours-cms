import axiosInstance from '@/api/axios';
import {
  CreateTourBody,
  Tour,
  TourSearchParams,
  UpdateTourBody,
} from '@/pages/tour/types/tour.types';
import { HttpResponse, PaginatedData } from '@/types';

export const tourApi = {
  getAllTours: async (params?: TourSearchParams) => {
    const response: HttpResponse<PaginatedData<Tour>> = await axiosInstance.get(
      '/tours',
      { params },
    );

    return response.data;
  },

  getTourById: async (_id: string) => {
    const response: HttpResponse<Tour> = await axiosInstance.get(
      `/tours/${_id}`,
    );

    return response.data;
  },

  createTour: async (body: CreateTourBody) => {
    const response: HttpResponse<Tour> = await axiosInstance.post(
      '/tours',
      body,
    );

    return response.data;
  },

  updateTour: async ({ _id, ...body }: UpdateTourBody) => {
    const response: HttpResponse<Tour> = await axiosInstance.patch(
      `/tours/${_id}`,
      body,
    );

    return response.data;
  },

  deleteTour: async (_id: string) => {
    const response: HttpResponse<Tour> = await axiosInstance.delete(
      `/tours/${_id}`,
    );

    return response.data;
  },
};
