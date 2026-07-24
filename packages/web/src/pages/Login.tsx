import { Navigate } from 'react-router-dom';
import { GOOGLE_CLIENT_ID, GOOGLE_OAUTH_SCOPES } from '../config';
import { useAuth } from '../lib/auth';

export default function Login() {
  const { token } = useAuth();
  if (token) return <Navigate to="/" replace />;

  const startGoogleLogin = () => {
    const redirectUri = `${window.location.origin}/oauth/callback`;
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('client_id', GOOGLE_CLIENT_ID);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('prompt', 'consent');
    url.searchParams.set('scope', GOOGLE_OAUTH_SCOPES.join(' '));
    window.location.href = url.toString();
  };

  return (
    <div className="center-screen">
      <div className="login-card">
        <h1>Ugram</h1>
        <p className="muted">
          All your YouTube playlists and Instagram saved posts, organized into boards.
        </p>
        <button onClick={startGoogleLogin}>Continue with Google</button>
        <p className="muted small">
          Use the same Google account you connected in the Ugram extension. Instagram is
          connected from the extension, since it has no public API for saved posts.
        </p>
      </div>
    </div>
  );
}
