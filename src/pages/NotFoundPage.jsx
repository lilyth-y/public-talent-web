import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SITE_NAME = '한신대학교 공공인재학부';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = `페이지를 찾을 수 없습니다 | ${SITE_NAME}`;
    return () => { document.title = SITE_NAME; };
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="not-found">
          <h1 className="section-title">페이지를 찾을 수 없습니다</h1>
          <p className="text-muted">
            요청하신 주소의 페이지가 없거나 이동되었을 수 있습니다.
          </p>
          <p>
            <Link to="/" className="btn btn-primary">
              홈으로 돌아가기
            </Link>
            {' '}
            <Link to="/about" className="btn btn-secondary">
              학부 소개
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
