export default function AcademicCurriculum() {
  const seriesCourses = [
    { year: 1, sem: 1, code: 'EN007', name: '경제금융학의기초', credit: '3-3' },
    { year: 1, sem: 1, code: 'EN009', name: '기초중국어Ⅰ', credit: '3-3' },
    { year: 1, sem: 1, code: 'EN010', name: '동아시아지역의이해', credit: '3-3' },
    { year: 1, sem: 1, code: 'GH001', name: '국제학입문', credit: '3-3' },
    { year: 1, sem: 1, code: 'GH003', name: '행정학입문', credit: '3-3' },
    { year: 1, sem: 2, code: 'EN008', name: '글로벌경제입문', credit: '3-3' },
    { year: 1, sem: 2, code: 'EN011', name: '기초중국어Ⅱ', credit: '3-3' },
    { year: 1, sem: 2, code: 'EN012', name: '동아시아통상학입문', credit: '3-3' },
    { year: 1, sem: 2, code: 'GH002', name: '정치학입문', credit: '3-3' },
    { year: 1, sem: 2, code: 'GH006', name: '공공빅데이터분석입문', credit: '3-3' },
  ];

  return (
    <>
      <h1 className="section-title">교과과정</h1>
      <div className="academic-inner">
        <section aria-labelledby="curriculum-intro">
          <h2 id="curriculum-intro">교육과정</h2>
          <p>
            공공인재빅데이터융합학은 문과·이과 통합 융합교육과정으로, 행정학과 AI·빅데이터 역량을 함께 기릅니다.
            전공 내 공공관리전공트랙·공공빅데이터전공트랙을 두어 행정학사·빅데이터분석학사 동시 취득이 가능합니다.
          </p>
        </section>
        <section aria-labelledby="curriculum-credits">
          <h2 id="curriculum-credits">졸업학점 (2025학년도 경제통상·국제·공공인재융합계열)</h2>
          <ul>
            <li>교양: 35~45학점</li>
            <li>계열공통: 45학점</li>
            <li>전공: 12학점 (전공별 상이)</li>
            <li>졸업학점: 130학점 이상</li>
          </ul>
          <p className="text-muted">
            전공별 계열공통·전공학점은 해당 전공 교육과정을 확인해 주세요.
          </p>
        </section>
        <section aria-labelledby="curriculum-series">
          <h2 id="curriculum-series">2025학년도 계열공통 교과목 (1학년)</h2>
          <div className="table-wrap">
            <table className="curriculum-table">
              <thead>
                <tr>
                  <th>학년</th>
                  <th>학기</th>
                  <th>학수번호</th>
                  <th>교과목</th>
                  <th>학점-시간</th>
                </tr>
              </thead>
              <tbody>
                {seriesCourses.map((c, i) => (
                  <tr key={i}>
                    <td>{c.year}</td>
                    <td>{c.sem}</td>
                    <td>{c.code}</td>
                    <td>{c.name}</td>
                    <td>{c.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section aria-labelledby="curriculum-tracks">
          <h2 id="curriculum-tracks">전공트랙</h2>
          <h3>공공관리전공트랙</h3>
          <p>
            데이터기반 인사·재무·정책관리, 행정법·형사법, 행정학입문·공공조직관리·인사관리·재무관리 등
            데이터분석기법을 공공분야에 적용하는 과목과 공공분야 진출을 위한 법과목을 이수합니다.
          </p>
          <h3>공공빅데이터전공트랙</h3>
          <p>
            공간정보분석(GIS), 소셜빅데이터분석, 머신러닝 입문·활용, 딥러닝 기초·심화,
            빅데이터분석 입문, 데이터 시각화 등 사회문제 해결을 위한 데이터·AI 과목을 이수합니다.
          </p>
          <p className="text-muted">
            상세 교과목표와 이수체계는 한신대 홈페이지 &gt; 대학 및 대학원 &gt; 학부(과) &gt; 교과과정에서 학번별로 확인할 수 있습니다. 문의: 031-379-0530
          </p>
        </section>
      </div>
    </>
  );
}
