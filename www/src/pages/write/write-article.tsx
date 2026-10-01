/**
 * Write/Edit Article Page
 * Form for creating a new article or editing an existing one
 */

import { createEffect, createSignal, Show } from 'solid-js';
import { useNavigate, useParams } from '@solidjs/router';
import { ArticleRepository } from '../../entities/article/article.repo';
import { store } from '../../core/store/store';
import type { ArticleCreateDto, ArticleUpdateDto } from '../../entities/article/article.types';

export function WriteArticlePage() {
  const params = useParams();
  const navigate = useNavigate();
  const isEditing = !!params.id;

  const [title, setTitle] = createSignal('');
  const [excerpt, setExcerpt] = createSignal('');
  const [content, setContent] = createSignal('');
  const [status, setStatus] = createSignal<'draft' | 'published' | 'archived'>('draft');
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  // Load article if editing
  createEffect(async () => {
    if (isEditing && params.id) {
      setLoading(true);
      try {
        // In a real app, we'd fetch the specific article
        // For now, we'll just load from the list
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
        setLoading(false);
      }
    }
  });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!title().trim() || !content().trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isEditing && params.id) {
        const updateData: ArticleUpdateDto = {
          title: title(),
          excerpt: excerpt(),
          content: content(),
          status,
        };
        await ArticleRepository.update(Number(params.id), updateData);
      } else {
        const createData: ArticleCreateDto = {
          title: title(),
          excerpt: excerpt(),
          content: content(),
          status,
        };
        await ArticleRepository.create(createData);
      }
      navigate('/my-articles');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="write-article-page">
      <h1>{isEditing ? 'Edit Article' : 'Write New Article'}</h1>

      <Show when={!store.auth.isAuthenticated}>
        <div class="error-message">You must be logged in to write articles. <a href="/auth/login">Login here</a></div>
      </Show>

      <Show when={error()}>
        <div class="error-message">{error()}</div>
      </Show>

      <form class="article-form" onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="title">Title</label>
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
          />
        </div>

        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            id="content"
            value={content()}
            onInput={(e) => setContent(e.currentTarget.value)}
            placeholder="Write your article content here..."
            required
          />
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select
            id="status"
            value={status()}
            onChange={(e) => setStatus(e.currentTarget.value as any)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <button type="submit" disabled={loading()}>
          {loading() ? 'Saving...' : isEditing ? 'Update Article' : 'Publish Article'}
        </button>
      </form>
    </div>
  );
}
