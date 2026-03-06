import { Link } from 'react-router-dom';
import { useNotices } from '../hooks/useNotices';
import { useGallery } from '../hooks/useGallery';

export default function CommunityPage() {
  const { noticeList, loading: noticesLoading } = useNotices();
  const { galleryItems, loading: galleryLoading } = useGallery(24);
  const newsItems = noticeList.slice(0, 5);

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">소식·갤러리</h1>
        <section aria-labelledby="community-news">
          <h2 id="community-news">소식</h2>
          {noticesLoading ? (
            <p className="text-muted">로딩 중…</p>
          ) : (
            <ul className="news-list">
              {newsItems.map((item) => (
                <li key={item.id} className="news-item">
                  {item.link ? (
                    <a href={item.link} className="news-link" target="_blank" rel="noopener noreferrer">
                      <span className="news-title">{item.title}</span>
                      <time className="news-date" dateTime={item.date}>
                        {item.date.replace(/-/g, '.')}
                      </time>
                    </a>
                  ) : (
                    <Link to="/academic/notice" className="news-link">
                      <span className="news-title">{item.title}</span>
                      <time className="news-date" dateTime={item.date}>
                        {item.date.replace(/-/g, '.')}
                      </time>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
        <section aria-labelledby="community-gallery">
          <h2 id="community-gallery">갤러리</h2>
          {galleryLoading ? (
            <p className="text-muted">로딩 중…</p>
          ) : galleryItems.length > 0 ? (
            <div className="gallery-grid-public">
              {galleryItems.map((item) => (
                <figure key={item.id} className="gallery-figure">
                  <img src={item.imageUrl} alt={item.title || item.caption || '갤러리'} loading="lazy" />
                  {(item.title || item.caption) && (
                    <figcaption>{item.title || item.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <p className="text-muted">등록된 사진이 없습니다.</p>
          )}
        </section>
        <section id="contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading">문의</h2>
          <p>
            공공인재빅데이터융합학 관련 문의는 학부 사무실로 연락해 주세요.
          </p>
          <ul>
            <li><strong>행정실</strong>: 8106호</li>
            <li><strong>수업</strong>: 031-379-0490</li>
            <li><strong>학적</strong>: 031-379-0530</li>
          </ul>
          <p className="text-muted">
            입학 문의: 한신대 입학처 031-379-0107~9 | 졸업·학사: 교무팀 031-379-0022~0023
          </p>
        </section>
      </div>
    </div>
  );
}
