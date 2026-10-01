/**
 * User Profile Component
 * Displays user information
 */

import { Show } from 'solid-js';
import type { UserPublic } from '../../entities/user/user.types';

interface UserProfileComponentProps {
  user: UserPublic;
  showEditLink?: boolean;
}

export function UserProfileComponent(props: UserProfileComponentProps) {
  return (
    <div class="user-profile-card">
      <div class="profile-header">
        <Show when={props.user.avatar}>
          <img src={props.user.avatar} alt={props.user.username} class="avatar-large" />
        </Show>

        <Show when={!props.user.avatar}>
          <div class="avatar-placeholder">{props.user.username.charAt(0).toUpperCase()}</div>
        </Show>

        <div class="profile-info">
          <h2>{props.user.displayName}</h2>
          <p class="username">@{props.user.username}</p>

          <Show when={props.user.bio}>
            <p class="bio">{props.user.bio}</p>
          </Show>

          <div class="profile-meta">
            <span class="joined">
              Joined {new Date(props.user.createdAt).toLocaleDateString()}
            </span>
            <span class="email">{props.user.email}</span>
          </div>
        </div>
      </div>

      <Show when={props.showEditLink}>
        <div class="profile-actions">
          <a href={`/user/${props.user.username}/edit`} class="btn-secondary">
            Edit Profile
          </a>
        </div>
      </Show>
    </div>
  );
}
