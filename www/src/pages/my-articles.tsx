/**
 * My Articles Page
 * Shows user's own articles (drafts, published, archived)
 */

import { createSignal, For, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { ArticleRepository } from '../entities/article/article.repo';
import { store } from '../core/store/store';
import type { Article } from '../entities/article/article.types';

export function MyArticlesPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = createSignal<Article[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const loadMyArticles = async () => {
    if (!store.auth.user) return;
    setLoading(true);
    setError(null);
    try {
      const result = await ArticleRepository.getUserArticles(store.auth.user.id);
      setArticles(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (articleId: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await ArticleRepository.delete(articleId);
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
    }
  };

  return (
    <div class="my-articles-page">
      <div class="header">
        <h1>My Articles</h1>
        <a href="/write" class="btn-primary">
          Write New Article
        </a>
      </div>

      <Show when={!store.auth.isAuthenticated}>
        <div class="error-message">
          You must be logged in. <a href="/auth/login">Login here</a>
        </div>
      </Show>

      <Show when={loading()}>
        <p>Loading your articles...</p>
      </Show>

      <Show when={error()}>
        <div class="error-message">{error()}</div>
      </Show>

      <div class="articles-container">
        <For each={articles()}>
          {(article) => (
            <div class="article-item">
              <div class="article-header">
                <h2>{article.title}</h2>
                <span class={`status status-${article.status}`}>{article.status}</span>
              </div>
              <p class="excerpt">{article.excerpt}</p>
              <div class="meta">
                <span class="date">{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <div class="actions">
                <a href={`/articles/${article.slug}`}>View</a>
                <a href={`/write/${article.id}`}>Edit</a>
                <button onClick={() => handleDelete(article.id)} class="btn-danger">
                  Delete
                </button>
              </div>
            </div>
          )}
        </For>
      </div>

      <Show when={articles().length === 0 && !loading()}>
        <p class="empty-state">
          You haven't written any articles yet.{' '}
          <a href="/write">Start writing now!</a>
        </p>
      </Show>

      {loadMyArticles()}
    </div>
  );
}
