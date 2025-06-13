export type SingleApiResponse<T> = {
  status: boolean;
  response: T;
  message: string;
};