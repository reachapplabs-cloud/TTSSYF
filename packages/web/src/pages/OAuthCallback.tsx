import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const oauthError = params.get('error');

    if (oauthError) {
      setError(`Google sign-in was cancelled (${oauthError})`);
      return;
    }
    if (!code) {
      setError('Missing authorization code from Google');
      return;
    }

    const redirectUri = `${window.location.origin}/oauth/callback`;
    api
      .exchangeGoogleCode(code, redirectUri)
      .then(({ token, user }) => {
        setSession(token, user);
        navigate('/', { replace: true });
      })
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, [navigate, setSession]);

  return (
    <div className="center-screen">
      {error ? (
        <div className="login-card">
          <p className="error">{error}</p>
          <a href="/login">Back to login</a>
        </div>
      ) : (
        <p>Signing you in…</p>
      )}
    </div>
  );
}
