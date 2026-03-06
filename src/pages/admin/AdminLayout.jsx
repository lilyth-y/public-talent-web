import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout({ children }) {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin', { replace: true });
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <div className="admin-main"><p>로딩 중…</p></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>관리자</h1>
        <div>
          <a href="/">사이트로 돌아가기</a>
          <span style={{ margin: '0 0.5rem' }}>|</span>
          <button type="button" className="btn btn-secondary" onClick={handleSignOut} style={{ padding: '0.4rem 0.75rem', fontSize: 'var(--text-sm)' }}>
            로그아웃
          </button>
        </div>
      </header>
      <nav className="admin-nav">
        <ul>
          <li><NavLink to="/admin" end>대시보드</NavLink></li>
          <li><NavLink to="/admin/notices">공지사항</NavLink></li>
          <li><NavLink to="/admin/gallery">갤러리</NavLink></li>
          <li><NavLink to="/admin/activities">활동 게시글</NavLink></li>
        </ul>
      </nav>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
