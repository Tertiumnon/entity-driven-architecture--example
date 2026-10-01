/**
 * Elysia App Configuration
 */

import { Elysia } from 'elysia';
import { cors } from '@elysia/cors';
import { registerAuthRoutes } from './routes/auth.routes';
import { registerUserRoutes } from './routes/users.routes';
import { registerArticleRoutes } from './routes/articles.routes';
import { registerCommentRoutes } from './routes/comments.routes';

export const createApp = () => {
  let app = new Elysia({ prefix: '/api' })
    .use(cors())
    .get('/health', () => ({
      status: 'ok',
      timestamp: new Date().toISOString(),
    }));

  // Register routes
  app = registerAuthRoutes(app);
  app = registerUserRoutes(app);
  app = registerArticleRoutes(app);
  app = registerCommentRoutes(app);

  return app;
};

export const startServer = async () => {
  const app = createApp();
  app.listen(3001, () => {
    console.log('🚀 API running at http://localhost:3001');
  });
};
