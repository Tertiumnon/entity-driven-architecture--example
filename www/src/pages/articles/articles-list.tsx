/**
 * Articles List Page
 * Displays all published articles with filtering and pagination
 */

import { createSignal, For, Show } from 'solid-js';
import { ArticleRepository } from '../../entities/article/article.repo';
import type { Article } from '../../entities/article/article.types';

export function ArticlesListPage() {
  const [articles, setArticles] = createSignal<Article[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

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
    <div class="articles-list-page">
      <h1>All Articles</h1>

      <Show when={loading()}>
        <p>Loading articles...</p>
      </Show>

      <Show when={error()}>
        <div class="error-message">{error()}</div>
      </Show>

      <div class="articles-container">
        <For each={articles()}>
          {(article) => (
            <div class="article-item">
              <h2>
                <a href={`/articles/${article.slug}`}>{article.title}</a>
              </h2>
              <p class="excerpt">{article.excerpt}</p>
              <div class="meta">
                <span class="author">By user {article.authorId}</span>
                <span class="date">{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <a href={`/articles/${article.slug}`} class="read-more">
                Read More →
              </a>
            </div>
          )}
        </For>
      </div>

      <Show when={articles().length === 0 && !loading()}>
        <p>No articles found.</p>
      </Show>

      {loadArticles()}
    </div>
  );
}
