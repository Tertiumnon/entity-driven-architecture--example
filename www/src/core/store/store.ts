/**
 * Global Store
 * Manages application state using Solid.js Store API
 */

import { createStore } from 'solid-js/store';
import type { User, AppState } from './store.types';
import { INITIAL_APP_STATE, STORAGE_KEYS } from './store.constants';

export const [store, setStore] = createStore<AppState>(INITIAL_APP_STATE);

// Auth helpers
export const authStore = () => store.auth;

export const setAuthUser = (user: User | null) => {
  setStore('auth', 'user', user);
  setStore('auth', 'isAuthenticated', !!user);
};

export const setAuthToken = (token: string | null) => {
  setStore('auth', 'token', token);
  if (token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }
};

export const setAuthLoading = (isLoading: boolean) => {
  setStore('auth', 'isLoading', isLoading);
};

export const setAuthError = (error: string | null) => {
  setStore('auth', 'error', error);
};

export const logout = () => {
  setStore('auth', {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  });
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Try to restore auth from localStorage on app load
 */
export const restoreAuth = () => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (token) {
    setStore('auth', 'token', token);
    // TODO: Fetch user data with token if available
  }
};
