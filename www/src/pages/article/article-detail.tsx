/**
 * Article Detail Page
 * Displays full article content and comments
 */

import { createEffect, createSignal, For, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { ArticleRepository } from '../../entities/article/article.repo';
import { CommentRepository } from '../../entities/comment/comment.repo';
import type { Article } from '../../entities/article/article.types';
import type { Comment } from '../../entities/comment/comment.types';

export function ArticleDetailPage() {
  const params = useParams();
  const [article, setArticle] = createSignal<Article | null>(null);
  const [comments, setComments] = createSignal<Comment[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [commentContent, setCommentContent] = createSignal('');

  createEffect(async () => {
    if (params.slug) {
      setLoading(true);
      setError(null);
      try {
        const articleData = await ArticleRepository.getBySlug(params.slug);
        setArticle(articleData);

        if (articleData) {
          const commentsData = await CommentRepository.getByArticleId(articleData.id);
          setComments(commentsData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    }
  });

  const handleCommentSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!article() || !commentContent().trim()) return;

    try {
      await CommentRepository.create(article()!.id, {
        content: commentContent(),
      });
      setCommentContent('');
      // Reload comments
      const updated = await CommentRepository.getByArticleId(article()!.id);
      setComments(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    }
  };

  return (
    <div class="article-detail-page">
      <Show when={loading()}>
        <p>Loading article...</p>
      </Show>

      <Show when={error()}>
        <div class="error-message">{error()}</div>
      </Show>

      <Show when={article()}>
        {(currentArticle) => (
          <>
            <article class="article-content">
              <h1>{currentArticle().title}</h1>
              <div class="article-meta">
                <span class="author">By user {currentArticle().authorId}</span>
                <span class="date">{new Date(currentArticle().createdAt).toLocaleDateString()}</span>
                <span class="status">{currentArticle().status}</span>
              </div>
              <div class="article-body">{currentArticle().content}</div>
            </article>

            <section class="comments-section">
              <h2>Comments ({comments().length})</h2>

              <form class="comment-form" onSubmit={handleCommentSubmit}>
                <textarea
                  value={commentContent()}
                  onInput={(e) => setCommentContent(e.currentTarget.value)}
                  placeholder="Add a comment..."
                  required
                />
                <button type="submit">Post Comment</button>
              </form>

              <div class="comments-list">
                <For each={comments()}>
                  {(comment) => (
                    <div class="comment">
                      <div class="comment-header">
                        <span class="author">User {comment.authorId}</span>
                        <span class="date">{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div class="comment-body">{comment.content}</div>
                    </div>
                  )}
                </For>
              </div>

              <Show when={comments().length === 0}>
                <p>No comments yet. Be the first to comment!</p>
              </Show>
            </section>
          </>
        )}
      </Show>

      <Show when={!article() && !loading()}>
        <p>Article not found.</p>
      </Show>
    </div>
  );
}
