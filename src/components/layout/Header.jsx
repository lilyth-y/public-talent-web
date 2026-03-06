import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const NAV_ITEMS = [
  { path: '/', label: '홈' },
  {
    label: '학부소개',
    children: [
      { path: '/about', label: '학부 소개' },
      { path: '/about/greeting', label: '학과장 인사말' },
      { path: '/about/location', label: '찾아오시는 길' },
    ],
  },
  { path: '/faculty', label: '교수진' },
  {
    label: '학사정보',
    children: [
      { path: '/academic', label: '학사정보 홈' },
      { path: '/academic/notice', label: '공지사항' },
      { path: '/academic/admission', label: '입학안내' },
      { path: '/academic/curriculum', label: '교과과정' },
      { path: '/academic/graduation', label: '졸업요건' },
      { path: '/academic/career', label: '취업·진로' },
    ],
  },
  { path: '/students', label: '학생지원' },
  { path: '/community', label: '소식·갤러리' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="site-header" role="banner">
      <a href="#main-content" className="skip-link">
        본문으로 건너뛰기
      </a>
      <div className="header-inner container">
        <Link to="/" className="logo" aria-label="한신대학교 공공인재학부 홈">
          <img src="/favicon.svg" alt="" className="logo-emblem" width="40" height="40" />
          <span className="logo-text">
            <span className="logo-univ">한신대학교</span>
            <span className="logo-dept">공공인재학부</span>
          </span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기/닫기"
        >
          <span className="hamburger" />
          <span className="hamburger" />
          <span className="hamburger" />
        </button>
        <nav
          id="main-nav"
          className={`main-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="주요 메뉴"
        >
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                const isOpen = openDropdown === item.label;
                return (
                  <li key={item.label} className="nav-item has-dropdown">
                    <button
                      type="button"
                      className={`nav-link ${item.children.some((c) => isActive(c.path)) ? 'active' : ''}`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    >
                      {item.label}
                    </button>
                    <ul className="dropdown" role="menu" hidden={!isOpen}>
                      {item.children.map((child) => (
                        <li key={child.path} role="none">
                          <Link
                            to={child.path}
                            className={`dropdown-link ${isActive(child.path) ? 'active' : ''}`}
                            role="menuitem"
                            onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={item.path} className="nav-item">
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
