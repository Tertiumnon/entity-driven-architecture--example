/**
 * Root App Component
 */

import { Component, onMount, Show } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import { restoreAuth, store, logout } from './core/store/store';
import { HomePage } from './pages/home';
import { ArticlesListPage } from './pages/articles/articles-list';
import { ArticleDetailPage } from './pages/article/article-detail';
import { WriteArticlePage } from './pages/write/write-article';
import { MyArticlesPage } from './pages/my-articles';
import { UserProfilePage } from './pages/profile/user-profile';
import { LoginPage } from './pages/auth/login';
import { RegisterPage } from './pages/auth/register';

const App: Component = () => {
  onMount(() => {
    // Restore auth from localStorage on app load
    restoreAuth();
  });

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div id="app" class="min-h-screen bg-gray-50 flex flex-col">
      <header class="bg-white shadow sticky top-0 z-50">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <a href="/" class="text-2xl font-bold text-blue-600">
              Blog Platform
            </a>
            <div class="flex gap-4 items-center">
              <a href="/" class="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="/articles" class="text-gray-700 hover:text-blue-600">
                Articles
              </a>
              <Show when={store.auth.isAuthenticated} fallback={
                <>
                  <a href="/auth/login" class="text-gray-700 hover:text-blue-600">
                    Login
                  </a>
                  <a href="/auth/register" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Sign Up
                  </a>
                </>
              }>
                <a href="/my-articles" class="text-gray-700 hover:text-blue-600">
                  My Articles
                </a>
                <a href={`/user/${store.auth.user?.username}`} class="text-gray-700 hover:text-blue-600">
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  class="text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </Show>
            </div>
          </div>
        </nav>
      </header>

      <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <Router>
          <Route path="/" component={HomePage} />
          <Route path="/articles" component={ArticlesListPage} />
          <Route path="/articles/:slug" component={ArticleDetailPage} />
          <Route path="/write" component={WriteArticlePage} />
          <Route path="/write/:id" component={WriteArticlePage} />
          <Route path="/my-articles" component={MyArticlesPage} />
          <Route path="/user/:username" component={UserProfilePage} />
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/register" component={RegisterPage} />
        </Router>
      </main>

      <footer class="bg-white border-t mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>&copy; 2026 Blog Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
