import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import './Admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  if (!isSupabaseConfigured()) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <h1>관리자 로그인</h1>
          <p className="admin-error">
            Supabase가 설정되지 않았습니다. .env에 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY를 설정한 뒤 docs/supabase-schema.sql을 실행하세요.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err.message || '로그인에 실패했습니다.');
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="admin-login">
      <div className="admin-login-box">
        <h1>관리자 로그인</h1>
        <p className="admin-login-desc">공지·갤러리를 관리하려면 로그인하세요.</p>
        <form onSubmit={handleSubmit}>
          <label>
            이메일
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '로그인 중…' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
