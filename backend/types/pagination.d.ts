export interface PaginationProps {
  page?: number;
  limit?: number;
}

export interface SearchPaginationProps extends PaginationProps {
  search?: string;
}
