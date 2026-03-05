import { Link, Outlet, useLocation } from 'react-router-dom';

const ABOUT_TABS = [
  { path: '/about', label: '학부 소개', end: true },
  { path: '/about/greeting', label: '학과장 인사말', end: false },
  { path: '/about/location', label: '찾아오시는 길', end: false },
];

export default function AboutPage() {
  const location = useLocation();

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">학부소개</h1>
        <nav className="sub-nav" aria-label="학부소개 하위 메뉴">
          <ul>
            {ABOUT_TABS.map(({ path, label, end }) => (
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
        <Outlet />
      </div>
    </div>
  );
}
