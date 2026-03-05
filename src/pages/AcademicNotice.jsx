import { Link } from 'react-router-dom';
import { useNotices } from '../hooks/useNotices';

export default function AcademicNotice() {
  const { noticeList, loading } = useNotices();

  if (loading) {
    return <p className="text-muted">로딩 중…</p>;
  }

  return (
    <>
      <h1 className="section-title">공지사항</h1>
      <ul className="news-list">
        {noticeList.map((item) => (
          <li key={item.id} className="news-item">
            {item.link ? (
              <a href={item.link} className="news-link" target="_blank" rel="noopener noreferrer">
                <span className="news-category">{item.category}</span>
                <span className="news-title">{item.title}</span>
                <time className="news-date" dateTime={item.date}>
                  {item.date.replace(/-/g, '.')}
                </time>
              </a>
            ) : (
              <Link to="/academic/notice" className="news-link">
                <span className="news-category">{item.category}</span>
                <span className="news-title">{item.title}</span>
                <time className="news-date" dateTime={item.date}>
                  {item.date.replace(/-/g, '.')}
                </time>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
