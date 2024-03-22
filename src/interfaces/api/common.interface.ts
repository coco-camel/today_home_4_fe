export interface ServerResponse<T> {
  data: T;
  message: string;
  status: boolean;
}
