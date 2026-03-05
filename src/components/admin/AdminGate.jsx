import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminLayout from '../../pages/admin/AdminLayout';
import AdminLogin from '../../pages/admin/AdminLogin';

export default function AdminGate() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="admin-layout">
        <div className="admin-main"><p>로딩 중…</p></div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
