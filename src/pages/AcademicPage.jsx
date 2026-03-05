import { Link } from 'react-router-dom';

const ACADEMIC_LINKS = [
  { to: '/academic/notice', label: '공지사항', desc: '학부 공지 및 소식' },
  { to: '/academic/admission', label: '입학안내', desc: '모집요강·일정·문의' },
  { to: '/academic/curriculum', label: '교과과정', desc: '교육과정·이수체계' },
  { to: '/academic/graduation', label: '졸업요건', desc: '이수학점·졸업인증 요건' },
  { to: '/academic/career', label: '취업·진로', desc: '취업현황·진로 로드맵' },
];

export default function AcademicPage() {
  return (
    <>
      <h1 className="section-title">학사정보</h1>
      <p className="intro-text">
        공지사항, 입학안내, 교과과정, 졸업요건, 취업·진로 정보를 확인하실 수 있습니다.
      </p>
      <div className="quick-grid">
        {ACADEMIC_LINKS.map(({ to, label, desc }) => (
          <Link key={to} to={to} className="quick-card">
            <span className="quick-label">{label}</span>
            <span className="quick-desc">{desc}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
