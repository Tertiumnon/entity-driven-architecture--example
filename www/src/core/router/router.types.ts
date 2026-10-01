/**
 * Router Types
 */

export interface Route {
  path: string;
  name: string;
  component: () => string;
  requiresAuth?: boolean;
}
