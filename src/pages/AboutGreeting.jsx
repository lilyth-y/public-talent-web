export default function AboutGreeting() {
  return (
    <div className="about-content greeting-content">
      <section aria-labelledby="greeting-heading">
        <h2 id="greeting-heading">학과장 인사말</h2>
        <div className="greeting-body">
          <p>
            공공인재빅데이터융합학에 관심을 가져 주신 여러분, 감사합니다.
          </p>
          <p>
            한신대학교 공공인재빅데이터융합학은 정의·생명·평화의 가치를 실천하는 공공인재를 양성합니다.
            급변하는 사회에서 공공성과 시민참여, 평화와 정의의 중요성이 더욱 부각되는 이때,
            우리 학부는 이론과 실천을 겸비한 인재를 배출하기 위해 최선을 다하고 있습니다.
          </p>
          <p>
            여러분의 도전과 성장을 응원하며, 학부의 일원이 되실 것을 기대합니다.
          </p>
          <p className="greeting-sign">
            한신대학교 공공인재빅데이터융합학 학과장 드림
          </p>
        </div>
      </section>
    </div>
  );
}
