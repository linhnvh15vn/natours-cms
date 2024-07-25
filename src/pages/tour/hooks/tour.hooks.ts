import { useQuery, useMutation } from '@tanstack/react-query';

import { tourApi } from '@/pages/tour/api/tour.api';
import {
  TourSearchParams,
  UseGetTourDetailsQueryOptions,
  UseGetToursQueryOption,
  UseTourMutationOptions,
} from '@/pages/tour/types/tour.types';

export const useGetTours = (
  params?: TourSearchParams,
  options?: UseGetToursQueryOption,
) => {
  return useQuery({
    ...options,
    queryKey: ['tours', params],
    queryFn: () => tourApi.getAllTours(params),
  });
};

export const useGetTourById = (
  _id: string,
  options?: UseGetTourDetailsQueryOptions,
) => {
  return useQuery({
    ...options,
    queryKey: ['tours', _id],
    queryFn: () => tourApi.getTourById(_id),
  });
};

export const useCreateTour = (options?: UseTourMutationOptions) => {
  return useMutation({
    ...options,
    mutationFn: tourApi.createTour,
  });
};

export const useUpdateTour = (options?: UseTourMutationOptions) => {
  return useMutation({
    ...options,
    mutationFn: tourApi.updateTour,
  });
};

export const useDeleteTour = (options?: UseTourMutationOptions) => {
  return useMutation({
    ...options,
    mutationFn: tourApi.deleteTour,
  });
};
