import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { api, Me } from './api';

interface AuthContextValue {
  token: string | null;
  user: Me | null;
  loading: boolean;
  setSession: (token: string, user: Me) => void;
  signOut: () => void;
  refreshMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('ugram_token'));
  const [user, setUser] = useState<Me | null>(() => {
    const raw = localStorage.getItem('ugram_user');
    return raw ? (JSON.parse(raw) as Me) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .me(token)
      .then(({ user: freshUser }) => {
        setUser(freshUser);
        localStorage.setItem('ugram_user', JSON.stringify(freshUser));
      })
      .catch(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('ugram_token');
        localStorage.removeItem('ugram_user');
      })
      .finally(() => setLoading(false));
    // Only re-validate when the token itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const setSession = (nextToken: string, nextUser: Me) => {
    localStorage.setItem('ugram_token', nextToken);
    localStorage.setItem('ugram_user', JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const signOut = () => {
    localStorage.removeItem('ugram_token');
    localStorage.removeItem('ugram_user');
    setToken(null);
    setUser(null);
  };

  const refreshMe = async () => {
    if (!token) return;
    const { user: freshUser } = await api.me(token);
    setUser(freshUser);
    localStorage.setItem('ugram_user', JSON.stringify(freshUser));
  };

  const value = useMemo(
    () => ({ token, user, loading, setSession, signOut, refreshMe }),
    [token, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
