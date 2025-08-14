export interface ICustomApiError {
  message: string;
  code: string;
  statusCode: number;
  [key: string]: unknown;
}
