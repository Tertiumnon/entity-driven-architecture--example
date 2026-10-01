/**
 * Article Form Component
 * Form for creating/editing articles
 */

import { createSignal, Show } from 'solid-js';
import type { ArticleCreateDto, ArticleUpdateDto, ArticleStatus } from '../../entities/article/article.types';

interface ArticleFormProps {
  isEditing?: boolean;
  onSubmit: (data: ArticleCreateDto | ArticleUpdateDto) => Promise<void>;
  initialData?: {
    title: string;
    excerpt: string;
    content: string;
    status: ArticleStatus;
  };
}

export function ArticleForm(props: ArticleFormProps) {
  const [title, setTitle] = createSignal(props.initialData?.title ?? '');
  const [excerpt, setExcerpt] = createSignal(props.initialData?.excerpt ?? '');
  const [content, setContent] = createSignal(props.initialData?.content ?? '');
  const [status, setStatus] = createSignal<ArticleStatus>(props.initialData?.status ?? 'draft');
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!title().trim() || !content().trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await props.onSubmit({
        title: title(),
        excerpt: excerpt(),
        content: content(),
        status: status(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form class="article-form" onSubmit={handleSubmit}>
      <Show when={error()}>
        <div class="error-message">{error()}</div>
      </Show>

      <div class="form-group">
        <label for="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title()}
          onInput={(e) => setTitle(e.currentTarget.value)}
          placeholder="Article title"
          required
        />
      </div>

      <div class="form-group">
        <label for="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          value={excerpt()}
          onInput={(e) => setExcerpt(e.currentTarget.value)}
          placeholder="Short summary of your article"
          rows="3"
        />
      </div>

      <div class="form-group">
        <label for="content">Content *</label>
        <textarea
          id="content"
          value={content()}
          onInput={(e) => setContent(e.currentTarget.value)}
          placeholder="Write your article content here..."
          rows="10"
          required
        />
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select
          id="status"
          value={status()}
          onChange={(e) => setStatus(e.currentTarget.value as ArticleStatus)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <button type="submit" disabled={loading()} class="btn-primary">
        {loading() ? 'Saving...' : props.isEditing ? 'Update Article' : 'Publish Article'}
      </button>
    </form>
  );
}
