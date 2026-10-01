/**
 * Router Constants
 */

import type { Route } from './router.types';

export const ROUTES: Route[] = [
  {
    path: '/',
    name: 'Home',
    component: () => 'Home', // TODO: Import Home page
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => 'Articles', // TODO: Import Articles list page
  },
  {
    path: '/articles/:slug',
    name: 'Article Detail',
    component: () => 'ArticleDetail', // TODO: Import Article detail page
  },
  {
    path: '/write',
    name: 'Write Article',
    component: () => 'WriteArticle', // TODO: Import Write article page
    requiresAuth: true,
  },
  {
    path: '/write/:id',
    name: 'Edit Article',
    component: () => 'EditArticle', // TODO: Import Edit article page
    requiresAuth: true,
  },
  {
    path: '/user/:username',
    name: 'User Profile',
    component: () => 'UserProfile', // TODO: Import User profile page
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => 'Login', // TODO: Import Login page
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => 'Register', // TODO: Import Register page
  },
  {
    path: '/my-articles',
    name: 'My Articles',
    component: () => 'MyArticles', // TODO: Import My articles page
    requiresAuth: true,
  },
];
