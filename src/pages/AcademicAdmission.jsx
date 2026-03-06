export default function AcademicAdmission() {
  return (
    <>
      <h1 className="section-title">입학안내</h1>
      <div className="academic-inner">
          <section aria-labelledby="admission-outline">
            <h2 id="admission-outline">모집요강</h2>
            <p>
              공공인재빅데이터융합학의 수시·정시 모집요강은 매년 한신대학교 입학처를 통해 공지됩니다.
              최신 모집요강은{' '}
              <a href="https://www.hs.ac.kr" target="_blank" rel="noopener noreferrer">
                한신대학교 홈페이지
              </a>
              의 입학 안내를 참고해 주세요.
            </p>
          </section>
          <section aria-labelledby="admission-schedule">
            <h2 id="admission-schedule">일정</h2>
            <p className="text-muted">
              수시·정시 일정은 대학 입학처 일정에 따릅니다. 학부 사무실로 문의하시면 자세한 안내를 받으실 수 있습니다.
            </p>
          </section>
          <section aria-labelledby="admission-contact">
            <h2 id="admission-contact">문의</h2>
            <p>
              입학 관련 문의: 한신대학교 입학처 및 공공인재빅데이터융합학 사무실
            </p>
          </section>
      </div>
    </>
  );
}
