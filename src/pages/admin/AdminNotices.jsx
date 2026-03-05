import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminNotices() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(!!supabase);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', category: '학사', link: '', body: '' });

  const load = () => {
    if (!supabase) return;
    setLoading(true);
    supabase
      .from('notices')
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
      .from('notices')
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
      title: '',
      date: new Date().toISOString().slice(0, 10),
      category: '학사',
      link: '',
      body: '',
    });
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      title: row.title,
      date: row.date,
      category: row.category || '학사',
      link: row.link || '',
      body: row.body || '',
    });
    setFormOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    const payload = {
      title: form.title,
      date: form.date,
      category: form.category,
      link: form.link || '',
      body: form.body || '',
    };
    if (editingId) {
      await supabase.from('notices').update(payload).eq('id', editingId);
    } else {
      await supabase.from('notices').insert(payload);
    }
    setFormOpen(false);
    setEditingId(null);
    load();
  };

  const remove = async (id) => {
    if (!supabase || !window.confirm('이 공지를 삭제할까요?')) return;
    await supabase.from('notices').delete().eq('id', id);
    load();
  };

  return (
    <>
      <h2>공지사항 관리</h2>
      {formOpen ? (
        <form onSubmit={save} className="admin-form">
          <label>제목 <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required /></label>
          <label>날짜 <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} required /></label>
          <label>구분 <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="입학, 학사, 행사 등" /></label>
          <label>링크(선택) <input type="url" value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} placeholder="https://..." /></label>
          <label>본문(선택) <textarea value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} /></label>
          <div className="form-actions admin-actions">
            <button type="submit" className="btn btn-primary">저장</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setFormOpen(false); setEditingId(null); }}>취소</button>
          </div>
        </form>
      ) : (
        <button type="button" className="btn btn-primary" onClick={openNew} style={{ marginBottom: '1rem' }}>새 공지 추가</button>
      )}
      {loading ? <p>로딩 중…</p> : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>구분</th>
              <th>제목</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {list.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>{row.category}</td>
                <td>{row.title}</td>
                <td>
                  <div className="admin-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => openEdit(row)}>수정</button>
                    <button type="button" className="btn btn-secondary" onClick={() => remove(row.id)}>삭제</button>
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
