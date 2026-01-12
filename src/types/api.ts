export enum API_STATUS_CODE {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500
}

type PaginationLink = {
  url?: string;
  label: string;
  active: boolean;
};

type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type ApiResponse<T> = {
  data?: T
}

export type ApiResponseWithPagination<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev?: string;
    next: string;
  };
  meta: PaginationMeta;
};