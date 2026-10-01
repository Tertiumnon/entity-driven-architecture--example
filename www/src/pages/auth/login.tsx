/**
 * Login Page
 * User authentication form
 */

import { createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { UserRepository } from '../../entities/user/user.repo';
import { setAuthUser, setAuthToken } from '../../core/store/store';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await UserRepository.login({
        email: email(),
        password: password(),
      });

      setAuthUser(result.user);
      setAuthToken(result.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="login-page">
      <div class="auth-container">
        <h1>Login</h1>
        <p>Sign in to your account</p>

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

          <button type="submit" disabled={loading()}>
            {loading() ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p class="auth-link">
          Don't have an account? <a href="/auth/register">Register here</a>
        </p>
      </div>
    </div>
  );
}
