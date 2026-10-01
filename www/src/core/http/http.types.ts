/**
 * HTTP Service Types
 */

export interface HttpResponse<T = unknown> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}
