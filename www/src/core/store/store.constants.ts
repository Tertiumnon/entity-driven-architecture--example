/**
 * Store Constants
 */

import type { AppState } from './store.types';

export const INITIAL_APP_STATE: AppState = {
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
} as const;
