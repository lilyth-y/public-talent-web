import { useParams, Link, Navigate } from 'react-router-dom';
import { getFacultyById } from '../data/faculty';
import './FacultyDetailPage.css';

export default function FacultyDetailPage() {
  const { id } = useParams();
  const professor = getFacultyById(id);

  if (!professor) {
    return <Navigate to="/faculty" replace />;
  }

  return (
    <div className="section faculty-detail">
      <div className="container">
        <nav className="breadcrumb" aria-label="breadcrumb">
          <Link to="/faculty">교수진</Link>
          <span className="breadcrumb-sep" aria-hidden="true">/</span>
          <span>{professor.name}</span>
        </nav>
        <article>
          <header className="faculty-detail-header">
            <h1 className="section-title faculty-detail-name">{professor.name}</h1>
            <p className="faculty-detail-title">{professor.title}</p>
          </header>
          <section className="faculty-detail-section" aria-labelledby="courses-heading">
            <h2 id="courses-heading">담당 교과</h2>
            <p>{professor.courses}</p>
          </section>
          <section className="faculty-detail-section" aria-labelledby="career-heading">
            <h2 id="career-heading">경력</h2>
            <ul>
              {professor.career.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="faculty-detail-section" aria-labelledby="education-heading">
            <h2 id="education-heading">학력</h2>
            <ul>
              {professor.education.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
          <p className="faculty-detail-outlink">
            <a href="https://hanshin-gongbig.super.site/교수진" target="_blank" rel="noopener noreferrer">
              전공 홈페이지 교수진
            </a>
            에서 더 자세한 내용을 확인할 수 있습니다.
          </p>
        </article>
      </div>
    </div>
  );
}
