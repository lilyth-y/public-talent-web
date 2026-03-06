import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useNotices } from '../hooks/useNotices';
import { useGallery } from '../hooks/useGallery';
import { useActivityPosts } from '../hooks/useActivityPosts';
import './ActivitiesPage.css';

export default function ActivitiesPage() {
  const { noticeList, loading: noticesLoading } = useNotices();
  const { galleryItems, loading: galleryLoading } = useGallery(200);
  const { activityPosts, loading: activitiesLoading } = useActivityPosts(200);

  const merged = useMemo(() => {
    const items = [];
    noticeList.forEach((n) => {
      items.push({
        type: 'notice',
        id: n.id,
        date: n.date,
        sortKey: n.date,
        title: n.title,
        category: n.category,
        link: n.link || '/academic/notice',
        external: !!n.link,
      });
    });
    galleryItems.forEach((g) => {
      const d = (g.created_at || '').slice(0, 10);
      items.push({
        type: 'gallery',
        id: g.id,
        date: d,
        sortKey: g.created_at || d,
        title: g.title || g.caption || '갤러리 사진',
        link: '/community#community-gallery',
        external: false,
      });
    });
    activityPosts.forEach((a) => {
      items.push({
        type: 'activity',
        id: a.id,
        date: a.date,
        sortKey: a.date,
        title: a.title,
        summary: a.summary,
        link: `/community/activity/${a.id}`,
        external: false,
      });
    });
    items.sort((x, y) => (y.sortKey || '').localeCompare(x.sortKey || ''));
    return items;
  }, [noticeList, galleryItems, activityPosts]);

  const loading = noticesLoading || galleryLoading || activitiesLoading;

  return (
    <div className="section activities-page">
      <div className="container">
        <h1 className="section-title">활동내역</h1>
        <p className="activities-intro">공지·갤러리·활동을 날짜순으로 모았습니다.</p>
        {loading ? (
          <p className="text-muted">로딩 중…</p>
        ) : merged.length === 0 ? (
          <p className="text-muted">등록된 항목이 없습니다.</p>
        ) : (
          <ul className="activities-timeline" aria-label="활동내역 목록">
            {merged.map((item) => (
              <li key={`${item.type}-${item.id}`} className="activities-item" data-type={item.type}>
                <time dateTime={item.date} className="activities-date">{item.date ? item.date.replace(/-/g, '.') : '—'}</time>
                <span className="activities-type">{item.type === 'notice' ? '공지' : item.type === 'gallery' ? '갤러리' : '활동'}</span>
                <span className="activities-title">{item.title}</span>
                {item.external ? (
                  <a href={item.link} className="activities-more" target="_blank" rel="noopener noreferrer">더보기</a>
                ) : (
                  <Link to={item.link} className="activities-more">더보기</Link>
                )}
              </li>
            ))}
          </ul>
        )}
        <p><Link to="/community" className="btn btn-secondary">소식·갤러리로 돌아가기</Link></p>
      </div>
    </div>
  );
}
