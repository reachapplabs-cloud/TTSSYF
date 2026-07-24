import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './lib/auth';
import Login from './pages/Login';
import OAuthCallback from './pages/OAuthCallback';
import Boards from './pages/Boards';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();
  if (loading) return <div className="center-screen">Loading…</div>;
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/oauth/callback" element={<OAuthCallback />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Boards />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
