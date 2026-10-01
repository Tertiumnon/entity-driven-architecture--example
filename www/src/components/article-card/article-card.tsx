/**
 * Article Card Component
 * Displays a preview of an article
 */

import type { Article } from '../../entities/article/article.types';

interface ArticleCardProps {
  article: Article;
  showActions?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function ArticleCard(props: ArticleCardProps) {
  return (
    <div class="article-card">
      <div class="card-header">
        <h3>
          <a href={`/articles/${props.article.slug}`}>{props.article.title}</a>
        </h3>
        <span class={`status status-${props.article.status}`}>{props.article.status}</span>
      </div>

      <p class="excerpt">{props.article.excerpt}</p>

      <div class="card-meta">
        <span class="author">By user {props.article.authorId}</span>
        <span class="date">{new Date(props.article.createdAt).toLocaleDateString()}</span>
      </div>

      <div class="card-footer">
        <a href={`/articles/${props.article.slug}`} class="read-more">
          Read More →
        </a>

        {props.showActions && (
          <div class="actions">
            {props.onEdit && (
              <button onClick={() => props.onEdit?.(props.article.id)} class="btn-edit">
                Edit
              </button>
            )}
            {props.onDelete && (
              <button onClick={() => props.onDelete?.(props.article.id)} class="btn-delete">
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
