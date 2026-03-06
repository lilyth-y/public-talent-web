import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase, getGalleryPublicUrl } from '../lib/supabase';
import './ActivityDetailPage.css';

export default function ActivityDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase || !id) return;
    supabase
      .from('activity_posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (!error && data) setPost(data);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="section container"><p className="text-muted">로딩 중…</p></div>;
  if (!post) return (
    <div className="section container">
      <p className="text-muted">해당 활동 글을 찾을 수 없습니다.</p>
      <Link to="/community" className="btn btn-secondary">소식·갤러리로 돌아가기</Link>
    </div>
  );

  const coverUrl = post.cover_image_path ? getGalleryPublicUrl(post.cover_image_path) : null;

  return (
    <div className="section activity-detail">
      <div className="container">
        <nav className="breadcrumb" aria-label="breadcrumb">
          <Link to="/community">소식·갤러리</Link>
          <span aria-hidden="true"> / </span>
          <span>활동</span>
        </nav>
        <article>
          <header className="activity-detail-header">
            <time dateTime={post.date}>{post.date.replace(/-/g, '.')}</time>
            <h1 className="section-title">{post.title}</h1>
            {post.summary && <p className="activity-summary">{post.summary}</p>}
          </header>
          {coverUrl && (
            <figure className="activity-cover">
              <img src={coverUrl} alt="" />
            </figure>
          )}
          {post.body && (
            <div className="activity-body" style={{ whiteSpace: 'pre-line' }}>{post.body}</div>
          )}
        </article>
        <p><Link to="/community/activities" className="btn btn-secondary">활동내역 보기</Link></p>
      </div>
    </div>
  );
}
