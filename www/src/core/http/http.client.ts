/**
 * HTTP Service
 * Handles API communication with the backend
 */

import type { HttpResponse } from './http.types';
import { HTTP_BASE_URL, HTTP_HEADERS } from './http.constants';

export class HttpService {
  /**
   * Make a GET request
   */
  static async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${HTTP_BASE_URL}${endpoint}`, {
      method: 'GET',
      ...options,
      headers: {
        [HTTP_HEADERS.CONTENT_TYPE]: 'application/json',
        ...options?.headers,
      },
    });

    return HttpService._handleResponse<T>(response);
  }

  /**
   * Make a POST request
   */
  static async post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${HTTP_BASE_URL}${endpoint}`, {
      method: 'POST',
      ...options,
      headers: {
        [HTTP_HEADERS.CONTENT_TYPE]: 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return HttpService._handleResponse<T>(response);
  }

  /**
   * Make a PATCH request
   */
  static async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${HTTP_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      ...options,
      headers: {
        [HTTP_HEADERS.CONTENT_TYPE]: 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return HttpService._handleResponse<T>(response);
  }

  /**
   * Make a DELETE request
   */
  static async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${HTTP_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      ...options,
      headers: {
        [HTTP_HEADERS.CONTENT_TYPE]: 'application/json',
        ...options?.headers,
      },
    });

    return HttpService._handleResponse<T>(response);
  }

  /**
   * Private helper: handle HTTP response
   */
  private static async _handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `HTTP Error: ${response.status} ${response.statusText}`
      );
    }

    return data.data as T;
  }
}
