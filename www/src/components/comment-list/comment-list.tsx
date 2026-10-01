/**
 * Comment List Component
 * Displays comments and allows posting new ones
 */

import { createSignal, For, Show } from 'solid-js';
import { store } from '../../core/store/store';
import type { Comment, CommentCreateDto } from '../../entities/comment/comment.types';

interface CommentListProps {
  articleId: number;
  comments: Comment[];
  onAddComment: (articleId: number, data: CommentCreateDto) => Promise<void>;
  onDeleteComment?: (commentId: number) => Promise<void>;
}

export function CommentList(props: CommentListProps) {
  const [newCommentContent, setNewCommentContent] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const handleCommentSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!newCommentContent().trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await props.onAddComment(props.articleId, {
        content: newCommentContent(),
      });
      setNewCommentContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm('Delete this comment?')) return;
    try {
      await props.onDeleteComment?.(commentId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete comment');
    }
  };

  return (
    <section class="comment-list">
      <h2>Comments ({props.comments.length})</h2>

      <Show when={store.auth.isAuthenticated}>
        <form class="comment-form" onSubmit={handleCommentSubmit}>
          <Show when={error()}>
            <div class="error-message">{error()}</div>
          </Show>

          <textarea
            value={newCommentContent()}
            onInput={(e) => setNewCommentContent(e.currentTarget.value)}
            placeholder="Add a comment..."
            rows="3"
          />
          <button type="submit" disabled={loading()} class="btn-primary">
            {loading() ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </Show>

      <Show when={!store.auth.isAuthenticated}>
        <div class="login-prompt">
          <p>
            <a href="/auth/login">Sign in</a> to leave a comment
          </p>
        </div>
      </Show>

      <div class="comments-container">
        <Show when={props.comments.length > 0}>
          <For each={props.comments}>
            {(comment) => (
              <div class="comment-item">
                <div class="comment-header">
                  <span class="author">User {comment.authorId}</span>
                  <span class="date">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  <Show when={store.auth.user?.id === comment.authorId && props.onDeleteComment}>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      class="btn-delete-small"
                    >
                      Delete
                    </button>
                  </Show>
                </div>
                <div class="comment-body">{comment.content}</div>
              </div>
            )}
          </For>
        </Show>

        <Show when={props.comments.length === 0}>
          <p class="no-comments">No comments yet. Be the first to comment!</p>
        </Show>
      </div>
    </section>
  );
}
