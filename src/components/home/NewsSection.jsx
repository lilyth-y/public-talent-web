import { Link } from 'react-router-dom';
import { useNotices } from '../../hooks/useNotices';
import './NewsSection.css';

export default function NewsSection() {
  const { noticeList, homeLimit, loading } = useNotices();
  const items = noticeList.slice(0, homeLimit);

  return (
    <section className="news-section section" aria-labelledby="news-heading">
      <div className="container">
        <div className="news-header">
          <h2 id="news-heading" className="section-title">
            최신 소식
          </h2>
          <Link to="/academic/notice" className="news-more">
            더보기
          </Link>
        </div>
        {loading ? (
          <p className="text-muted">로딩 중…</p>
        ) : (
          <ul className="news-list">
            {items.map((item) => (
              <li key={item.id} className="news-item">
                <Link to="/academic/notice" className="news-link">
                  <span className="news-category">{item.category}</span>
                  <span className="news-title">{item.title}</span>
                  <time className="news-date" dateTime={item.date}>
                    {item.date.replace(/-/g, '.')}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
