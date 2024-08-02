import {
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';

import { type User } from '@/pages/user/types/user.types';
import { type PaginatedData } from '@/types';

export type Review = {
  _id: string;
  review: string;
  rating: number;
  user: User;
  createdAt: Date;
};

export enum TourDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  DIFFICULT = 'difficult',
}

export type Tour = {
  _id: string;
  name: string;
  slug?: string;
  duration: number;
  maxGroupSize: number;
  difficulty: TourDifficulty;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: Date[];
  secretTour: boolean;
  /* eslint-disable-next-line */
  startLocation: any;
  locations: [];
  guides: User[];
  reviews?: Review[];
};

export type CreateTourBody = {
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: TourDifficulty;
  price: number;
  priceDiscount?: number;
  summary: string;
  description?: string;
  imageCover: string;
  images?: string[];
  startDates?: Date[];
  /* eslint-disable-next-line */
  startLocation?: any;
  locations?: [];
  guides?: string[];
};

export type UpdateTourBody = Partial<CreateTourBody> & {
  _id: string;
};

export type TourSearchParams = {
  page: number;
  name?: string;
  difficulty?: TourDifficulty;
};

export type SearchTourFormValues = Omit<TourSearchParams, 'page'>;

export type UseGetToursQueryOption = Omit<
  UseQueryOptions<PaginatedData<Tour>>,
  'queryKey' | 'queryFn'
>;

export type UseGetTourDetailsQueryOptions = Omit<
  UseQueryOptions<Tour>,
  'queryKey' | 'queryFn'
>;

export type UseTourMutationOptions = Omit<
  UseMutationOptions<Tour, Error, CreateTourBody | UpdateTourBody | string>,
  'mutationKey' | 'mutationFn'
>;
