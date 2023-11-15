export type BaseHttpResponse<T = any> = {
  data: T;
  message: string;
  success: boolean;
  total: number;
};
