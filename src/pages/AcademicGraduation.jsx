export default function AcademicGraduation() {
  return (
    <>
      <h1 className="section-title">졸업요건</h1>
      <div className="academic-inner">
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          아래 내용은 한신대학교 공통 졸업요건입니다. 입학학번별 상이할 수 있으므로{' '}
          <a href="https://www.hs.ac.kr/kor/4935/subview.do" target="_blank" rel="noopener noreferrer">
            한신대학교 학사행정안내 &gt; 졸업
          </a>
          과 교무팀에서 최종 확인하시기 바랍니다.
        </p>
        <section aria-labelledby="graduation-overview">
          <h2 id="graduation-overview">졸업 요건 개요</h2>
          <ul>
            <li><strong>교과목 이수</strong>: 교양필수 및 각 학부(과)에 규정된 전공필수 이수</li>
            <li><strong>졸업이수학점</strong>: 140학점 이상 (2015년도 이후 입학자는 130학점 이상) ※ 아노덴인재대학은 120학점</li>
            <li><strong>재학기간</strong>: 8학기 이상 등록 (조기졸업 대상자는 예외)</li>
          </ul>
        </section>
        <section aria-labelledby="graduation-credits">
          <h2 id="graduation-credits">교양 이수학점 (학번별)</h2>
          <p>입학학번에 따라 교양 최소·최대 이수학점이 다릅니다.</p>
          <ul>
            <li><strong>2023학번~</strong>: 최소 35학점 ~ 최대 45학점</li>
            <li><strong>2017~2022학번</strong>: 최소 35학점 ~ 최대 49학점</li>
            <li><strong>2004~2016학번</strong>: 최소 35학점 ~ 최대 45학점</li>
          </ul>
          <p className="text-muted">
            상세한 학번별 졸업학점은 한신대 홈페이지 졸업 안내에서 PDF로 제공합니다.
          </p>
        </section>
        <section aria-labelledby="graduation-required">
          <h2 id="graduation-required">교양필수·전공필수</h2>
          <p>
            교양필수(채플, 성서입문, 신학입문, 성서·기독교 관련과목, 대학생활길잡이, 진로와상담, 글쓰기의기초, 컴퓨팅사고와SW코딩, Essential English 등)는 학번별로 적용이 다릅니다.
            전공필수는 학부(과) 교과과정에 따르며, <strong>입학학번 기준</strong>으로 적용됩니다.
          </p>
          <p className="text-muted">
            전공필수 과목: 한신대 홈페이지 &gt; 대학 및 대학원 &gt; 학부(과) &gt; 교과과정 &gt; 년도 선택에서 확인할 수 있습니다.
          </p>
        </section>
        <section aria-labelledby="graduation-cert">
          <h2 id="graduation-cert">비교과(졸업인증)</h2>
          <p className="text-muted">
            비교과 프로그램 필수 이수 여부는 학사행정안내의 「비교과과정(졸업인증)」에서 확인해 주세요.
          </p>
        </section>
        <section aria-labelledby="graduation-contact">
          <h2 id="graduation-contact">문의</h2>
          <p>
            <strong>교무팀</strong> (졸업·학사): 031-379-0022 ~ 0023<br />
            <a href="https://www.hs.ac.kr/kor/4935/subview.do" target="_blank" rel="noopener noreferrer">
              한신대학교 졸업 안내 바로가기
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
