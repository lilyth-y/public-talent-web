const SUPPORT_ITEMS = [
  {
    id: 1,
    title: '장학제도',
    desc: '성적· need-based 장학금 및 학부 특별 장학 프로그램 안내',
  },
  {
    id: 2,
    title: '해외교류',
    desc: '해외 대학 교류 프로그램, 어학 연수, 국제 세미나 참가 지원',
  },
  {
    id: 3,
    title: '멘토링',
    desc: '선배·교수진과의 멘토링 프로그램으로 진로·학업 설계 지원',
  },
  {
    id: 4,
    title: '학생회·동아리',
    desc: '학부 학생회 및 동아리 활동 안내',
  },
];

export default function StudentsPage() {
  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">학생지원</h1>
        <p className="intro-text">
          장학, 해외교류, 멘토링, 학생회 등 다양한 학생 지원 프로그램을 안내합니다.
        </p>
        <div className="support-grid">
          {SUPPORT_ITEMS.map((item) => (
            <article key={item.id} className="support-card">
              <h2 className="support-card-title">{item.title}</h2>
              <p className="support-card-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
