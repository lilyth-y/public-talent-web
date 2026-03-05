import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedAdmin({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="admin-main"><p>로딩 중…</p></div>;
  if (!user) return <Navigate to="/admin" state={{ from: location }} replace />;
  return children;
}
