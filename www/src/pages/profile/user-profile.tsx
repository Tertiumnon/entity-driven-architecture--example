/**
 * User Profile Page
 * Displays user information and their articles
 */

import { createEffect, createSignal, For, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { UserRepository } from '../../entities/user/user.repo';
import { ArticleRepository } from '../../entities/article/article.repo';
import type { Article } from '../../entities/article/article.types';
import type { UserPublic } from '../../entities/user/user.types';

export function UserProfilePage() {
  const params = useParams();
  const [user, setUser] = createSignal<UserPublic | null>(null);
  const [articles, setArticles] = createSignal<Article[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(async () => {
    if (params.username) {
      setLoading(true);
      setError(null);
      try {
        const userData = await UserRepository.getByUsername(params.username);
        setUser(userData);

        if (userData) {
          const userArticles = await ArticleRepository.getUserArticles(userData.id);
          setArticles(userArticles);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user profile');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div class="user-profile-page">
      <Show when={loading()}>
        <p>Loading profile...</p>
      </Show>

      <Show when={error()}>
        <div class="error-message">{error()}</div>
      </Show>

      <Show when={user()}>
        {(currentUser) => (
          <>
            <div class="profile-header">
              <Show when={currentUser().avatar}>
                <img src={currentUser().avatar} alt={currentUser().username} class="avatar" />
              </Show>
              <div class="profile-info">
                <h1>{currentUser().displayName}</h1>
                <p class="username">@{currentUser().username}</p>
                <Show when={currentUser().bio}>
                  <p class="bio">{currentUser().bio}</p>
                </Show>
                <p class="joined">
                  Joined {new Date(currentUser().createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <section class="user-articles">
              <h2>Articles by {currentUser().displayName}</h2>
              <Show when={articles().length > 0}>
                <div class="articles-grid">
                  <For each={articles()}>
                    {(article) => (
                      <div class="article-item">
                        <h3>
                          <a href={`/articles/${article.slug}`}>{article.title}</a>
                        </h3>
                        <p class="excerpt">{article.excerpt}</p>
                        <div class="meta">
                          <span class="status">{article.status}</span>
                          <span class="date">
                            {new Date(article.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={articles().length === 0}>
                <p>This user has no articles yet.</p>
              </Show>
            </section>
          </>
        )}
      </Show>

      <Show when={!user() && !loading()}>
        <p>User not found.</p>
      </Show>
    </div>
  );
}
