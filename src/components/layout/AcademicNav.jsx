import { Link, useLocation } from 'react-router-dom';

const ACADEMIC_LINKS = [
  { path: '/academic', label: '학사정보 홈', end: true },
  { path: '/academic/notice', label: '공지사항', end: false },
  { path: '/academic/admission', label: '입학안내', end: false },
  { path: '/academic/curriculum', label: '교과과정', end: false },
  { path: '/academic/graduation', label: '졸업요건', end: false },
  { path: '/academic/career', label: '취업·진로', end: false },
];

export default function AcademicNav() {
  const location = useLocation();

  return (
    <nav className="sub-nav" aria-label="학사정보 하위 메뉴">
      <ul>
        {ACADEMIC_LINKS.map(({ path, label, end }) => (
          <li key={path}>
            <Link
              to={path}
              className={location.pathname === path ? 'active' : ''}
              end={end}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
