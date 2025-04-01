export interface IQueryRequestURL {
  limit: number;
  offset: number;
}

export interface IQueryRequestBody {
  name: string | null;
  createdDate: string | null;
}
