import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">한신대학교 공공인재빅데이터융합학</span>
          <p className="footer-tagline">
            평화·공공성·정의·생명을 실천하는 공공인재 양성
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h3 className="footer-heading">바로가기</h3>
            <ul>
              <li><Link to="/about">학부소개</Link></li>
              <li><Link to="/faculty">교수진</Link></li>
              <li><Link to="/academic">학사정보</Link></li>
              <li><Link to="/students">학생지원</Link></li>
              <li><Link to="/community">소식·갤러리</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-heading">문의·바로가기</h3>
            <ul>
              <li><a href="https://www.hs.ac.kr" target="_blank" rel="noopener noreferrer">한신대학교 홈페이지</a></li>
              <li><a href="https://ent.hs.ac.kr/ipsi/main/main.asp" target="_blank" rel="noopener noreferrer">입학안내</a></li>
              <li><a href="https://www.youtube.com/channel/UClchjgC-vhOsXAy8bhwKX2w" target="_blank" rel="noopener noreferrer">유튜브 채널</a></li>
              <li><a href="https://m.blog.naver.com/hsgongbig?tab=1" target="_blank" rel="noopener noreferrer">학과 블로그</a></li>
              <li><Link to="/community#contact">문의하기</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; {currentYear} 한신대학교 공공인재빅데이터융합학. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
