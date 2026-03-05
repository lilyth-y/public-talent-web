import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <h1 id="hero-heading" className="hero-title">
          한신대학교 공공인재학부
        </h1>
        <p className="hero-subtitle">
          평화·공공성·정의·생명을 실천하는 공공인재를 양성합니다
        </p>
        <div className="hero-actions">
          <Link to="/academic/admission" className="btn btn-primary hero-cta">
            입학안내
          </Link>
          <Link to="/about" className="btn btn-secondary hero-cta">
            학부 소개
          </Link>
        </div>
      </div>
    </section>
  );
}
