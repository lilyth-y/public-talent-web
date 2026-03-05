import FacultyCard from '../components/faculty/FacultyCard';
import { FACULTY_LIST } from '../data/faculty';

export default function FacultyPage() {
  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">교수진</h1>
        <p className="intro-text">
          공공인재빅데이터융합학 전공 교수진입니다. 각 교수님을 클릭하면 담당 교과·경력·학력을 확인할 수 있습니다.
        </p>
        <div className="faculty-grid">
          {FACULTY_LIST.map((f) => (
            <FacultyCard
              key={f.id}
              name={f.name}
              title={f.title}
              research={f.courses}
              to={`/faculty/${f.id}`}
            />
          ))}
        </div>
        <p className="intro-text" style={{ marginTop: '2rem' }}>
          <a href="https://hanshin-gongbig.super.site/교수진" target="_blank" rel="noopener noreferrer">
            전공 홈페이지 교수진
          </a>
          에서 더 자세한 내용을 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
