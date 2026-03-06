import { useState, useEffect } from 'react';
import { supabase, getGalleryPublicUrl } from '../../lib/supabase';

export default function AdminActivities() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(!!supabase);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    date: '',
    title: '',
    summary: '',
    body: '',
    cover_image_path: '',
  });
  const [coverFile, setCoverFile] = useState(null);

  const load = () => {
    if (!supabase) return;
    setLoading(true);
    supabase
      .from('activity_posts')
      .select('*')
      .order('date', { ascending: false })
      .then(({ data, error }) => {
        setLoading(false);
        if (!error && Array.isArray(data)) setList(data);
      });
  };

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('activity_posts')
      .select('*')
      .order('date', { ascending: false })
      .then(({ data, error }) => {
        setLoading(false);
        if (!error && Array.isArray(data)) setList(data);
      });
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm({
      date: new Date().toISOString().slice(0, 10),
      title: '',
      summary: '',
      body: '',
      cover_image_path: '',
    });
    setCoverFile(null);
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      date: row.date,
      title: row.title,
      summary: row.summary || '',
      body: row.body || '',
      cover_image_path: row.cover_image_path || '',
    });
    setCoverFile(null);
    setFormOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    let coverPath = form.cover_image_path;
    if (coverFile) {
      const ext = coverFile.name.split('.').pop() || 'jpg';
      const path = `activities/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from('gallery').upload(path, coverFile, { upsert: false });
      if (uploadErr) {
        alert('대표 사진 업로드 실패: ' + uploadErr.message);
        setSaving(false);
        return;
      }
      coverPath = path;
    }
    const payload = {
      date: form.date,
      title: form.title,
      summary: form.summary || '',
      body: form.body || '',
      cover_image_path: coverPath || '',
    };
    if (editingId) {
      await supabase.from('activity_posts').update(payload).eq('id', editingId);
    } else {
      await supabase.from('activity_posts').insert(payload);
    }
    setFormOpen(false);
    setEditingId(null);
    setCoverFile(null);
    load();
    setSaving(false);
  };

  const remove = async (id, coverPath) => {
    if (!supabase || !window.confirm('이 활동 글을 삭제할까요?')) return;
    await supabase.from('activity_posts').delete().eq('id', id);
    if (coverPath) await supabase.storage.from('gallery').remove([coverPath]);
    load();
  };

  return (
    <>
      <h2>활동 게시글 관리</h2>
      <p className="admin-desc">날짜와 제목만 넣어도 저장됩니다. 요약·본문·대표 사진은 선택입니다.</p>
      {formOpen ? (
        <form onSubmit={save} className="admin-form">
          <label>날짜 <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} required /></label>
          <label>제목 <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required placeholder="예: 2025학년도 오리엔테이션" /></label>
          <label>요약(한 줄, 선택) <input value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} placeholder="목록·카드에 보일 한 줄 설명" /></label>
          <label>본문(선택) <textarea value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} placeholder="메모장처럼 여러 줄 입력하면 그대로 글로 보입니다" rows={6} /></label>
          <label>대표 사진(선택) <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} /> {editingId && form.cover_image_path && <span className="text-muted">현재 이미지 유지. 새 파일 선택 시 교체됩니다.</span>}</label>
          <div className="form-actions admin-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? '저장 중…' : '저장'}</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setFormOpen(false); setEditingId(null); setCoverFile(null); }}>취소</button>
          </div>
        </form>
      ) : (
        <button type="button" className="btn btn-primary" onClick={openNew} style={{ marginBottom: '1rem' }}>새 활동 추가</button>
      )}
      {loading ? <p>로딩 중…</p> : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>제목</th>
              <th>요약</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {list.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>{row.title}</td>
                <td>{(row.summary || '').slice(0, 40)}{(row.summary || '').length > 40 ? '…' : ''}</td>
                <td>
                  <div className="admin-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => openEdit(row)}>수정</button>
                    <button type="button" className="btn btn-secondary" onClick={() => remove(row.id, row.cover_image_path)}>삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
