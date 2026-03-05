import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <>
      <h2>대시보드</h2>
      <p>공지와 갤러리를 관리할 수 있습니다.</p>
      <ul>
        <li><Link to="/admin/notices">공지사항 관리</Link></li>
        <li><Link to="/admin/gallery">갤러리 관리</Link></li>
      </ul>
    </>
  );
}
