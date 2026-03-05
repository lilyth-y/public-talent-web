import { Link } from 'react-router-dom';
import './QuickLinks.css';

const LINKS = [
  { to: '/academic/admission', label: '입학안내', desc: '모집요강·일정' },
  { to: '/academic/curriculum', label: '교과과정', desc: '교육과정·이수체계' },
  { to: '/academic/career', label: '취업·진로', desc: '취업현황·진로로드맵' },
  { to: '/community#contact', label: '문의하기', desc: '학부 문의' },
];

export default function QuickLinks() {
  return (
    <section className="quick-links section" aria-labelledby="quick-heading">
      <div className="container">
        <h2 id="quick-heading" className="section-title">
          빠른 링크
        </h2>
        <div className="quick-grid">
          {LINKS.map(({ to, label, desc }) => (
            <Link key={to} to={to} className="quick-card">
              <span className="quick-label">{label}</span>
              <span className="quick-desc">{desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
