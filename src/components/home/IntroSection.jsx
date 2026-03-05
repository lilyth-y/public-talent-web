import { Link } from 'react-router-dom';
import './IntroSection.css';

export default function IntroSection() {
  return (
    <section className="intro-section section" aria-labelledby="intro-heading">
      <div className="container">
        <h2 id="intro-heading" className="section-title">
          공공인재학부를 소개합니다
        </h2>
        <div className="intro-content">
          <p className="intro-lead">
            한신대학교 공공인재학부는 공공성(publicness)을 지향하며, 공공문제 해결과 공공가치 구현에 기여하는 인재를 양성합니다.
            행정·공공관리와 AI·빅데이터를 융합한 교육으로 데이터기반 공공혁신인재를 배출하고 있습니다.
          </p>
          <p className="intro-body">
            실무형 공공행정 전문인재, 실천형 사회혁신 전문인재, 창의융합형 공공데이터사이언티스트를 양성하며,
            한신대의 평화·공공성의 가치를 실천합니다.
          </p>
          <Link to="/about" className="btn btn-primary intro-link">
            자세히 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
