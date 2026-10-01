/**
 * Register Page
 * User account creation form
 */

import { createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { UserRepository } from '../../entities/user/user.repo';
import { setAuthUser, setAuthToken } from '../../core/store/store';

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [displayName, setDisplayName] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [passwordConfirm, setPasswordConfirm] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (password() !== passwordConfirm()) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await UserRepository.register({
        email: email(),
        username: username(),
        displayName: displayName(),
        password: password(),
      });

      setAuthUser(result.user);
      setAuthToken(result.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="register-page">
      <div class="auth-container">
        <h1>Create Account</h1>
        <p>Join our community</p>

        <Show when={error()}>
          <div class="error-message">{error()}</div>
        </Show>

        <form class="auth-form" onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              value={username()}
              onInput={(e) => setUsername(e.currentTarget.value)}
              placeholder="username"
              required
            />
          </div>

          <div class="form-group">
            <label for="displayName">Display Name</label>
            <input
              id="displayName"
              type="text"
              value={displayName()}
              onInput={(e) => setDisplayName(e.currentTarget.value)}
              placeholder="Your Name"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div class="form-group">
            <label for="passwordConfirm">Confirm Password</label>
            <input
              id="passwordConfirm"
              type="password"
              value={passwordConfirm()}
              onInput={(e) => setPasswordConfirm(e.currentTarget.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading()}>
            {loading() ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p class="auth-link">
          Already have an account? <a href="/auth/login">Login here</a>
        </p>
      </div>
    </div>
  );
}
