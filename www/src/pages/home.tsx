/**
 * Home Page
 * Main landing page showing recent articles feed
 */

import { createSignal, For, Show } from 'solid-js';
import { ArticleRepository } from '../entities/article/article.repo';
import type { Article } from '../entities/article/article.types';

export function HomePage() {
  const [articles, setArticles] = createSignal<Article[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  // Load published articles on mount
  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await ArticleRepository.getPublished();
      setArticles(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="home-page">
      <h1>Welcome to Our Blog</h1>
      <p>Discover articles from our community</p>

      <Show when={loading()}>
        <p>Loading articles...</p>
      </Show>

      <Show when={error()}>
        <div class="error-message">{error()}</div>
      </Show>

      <div class="articles-grid">
        <For each={articles()}>
          {(article) => (
            <article class="article-preview">
              <h2>
                <a href={`/articles/${article.slug}`}>{article.title}</a>
              </h2>
              <p class="excerpt">{article.excerpt}</p>
              <div class="meta">
                <span class="author">{article.authorId}</span>
                <span class="date">{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </article>
          )}
        </For>
      </div>

      <Show when={articles().length === 0 && !loading()}>
        <p>No articles found yet.</p>
      </Show>

      {loadArticles()}
    </div>
  );
}
