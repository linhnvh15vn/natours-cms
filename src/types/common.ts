export type Example = {
  field: string;
};

export type HttpResponse<T> = {
  status: 'success' | 'fail' | 'error';
  data: T;
};

export type PaginatedData<T> = {
  currentItemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
};
