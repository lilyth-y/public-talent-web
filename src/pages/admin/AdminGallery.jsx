import { useState, useEffect } from 'react';
import { supabase, getGalleryPublicUrl } from '../../lib/supabase';

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(!!supabase);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);

  const load = () => {
    if (!supabase) return;
    setLoading(true);
    supabase
      .from('gallery_items')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        setLoading(false);
        if (!error && Array.isArray(data)) setItems(data);
      });
  };

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('gallery_items')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        setLoading(false);
        if (!error && Array.isArray(data)) setItems(data);
      });
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    if (!supabase || !file) return;
    setUploading(true);
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from('gallery').upload(path, file, { upsert: false });
    if (uploadErr) {
      alert('업로드 실패: ' + uploadErr.message);
      setUploading(false);
      return;
    }
    const { error: insertErr } = await supabase.from('gallery_items').insert({
      title: title || '',
      caption: caption || '',
      image_path: path,
      sort_order: items.length,
    });
    if (insertErr) alert('저장 실패: ' + insertErr.message);
    else load();
    setTitle('');
    setCaption('');
    setFile(null);
    setUploading(false);
  };

  const remove = async (id, imagePath) => {
    if (!supabase || !window.confirm('이 항목을 삭제할까요?')) return;
    await supabase.from('gallery_items').delete().eq('id', id);
    if (imagePath) await supabase.storage.from('gallery').remove([imagePath]);
    load();
  };

  return (
    <>
      <h2>갤러리 관리</h2>
      <div className="gallery-upload">
        <form onSubmit={upload}>
          <label>제목(선택) <input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <label>설명(선택) <input value={caption} onChange={(e) => setCaption(e.target.value)} /></label>
          <label>이미지 <input type="file" accept="image/*" required onChange={(e) => setFile(e.target.files?.[0] || null)} /></label>
          <button type="submit" className="btn btn-primary" disabled={uploading}>{uploading ? '업로드 중…' : '업로드'}</button>
        </form>
      </div>
      {loading ? <p>로딩 중…</p> : (
        <div className="gallery-grid">
          {items.map((item) => (
            <div key={item.id} className="gallery-item-card">
              <img src={getGalleryPublicUrl(item.image_path)} alt={item.title || item.caption || '갤러리'} />
              <div className="caption">{item.title || item.caption || '(제목 없음)'}</div>
              <div className="admin-actions" style={{ padding: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => remove(item.id, item.image_path)}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
