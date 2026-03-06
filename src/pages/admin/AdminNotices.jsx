import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';

const CATEGORY_OPTIONS = ['학사', '입학', '행사', '장학', '일반', '기타'];

const INITIAL_FORM = {
  title: '',
  date: '',
  category: '학사',
  link: '',
  body: '',
};

export default function AdminNotices() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(!!supabase);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [filters, setFilters] = useState({ query: '', category: '전체' });
  const [notice, setNotice] = useState(null);

  const load = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('date', { ascending: false });

    setLoading(false);
    if (error) {
      setNotice({ type: 'error', text: `공지 목록을 불러오지 못했습니다: ${error.message}` });
      return;
    }
    setList(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('notices')
      .select('*')
      .order('date', { ascending: false })
      .then(({ data, error }) => {
        setLoading(false);
        if (error) {
          setNotice({ type: 'error', text: `공지 목록을 불러오지 못했습니다: ${error.message}` });
          return;
        }
        setList(Array.isArray(data) ? data : []);
      });
  }, []);

  const filteredList = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return list.filter((row) => {
      const categoryMatched = filters.category === '전체' || (row.category || '학사') === filters.category;
      if (!categoryMatched) return false;
      if (!query) return true;
      const searchable = `${row.title || ''} ${row.body || ''} ${row.link || ''}`.toLowerCase();
      return searchable.includes(query);
    });
  }, [list, filters]);

  const openNew = () => {
    setEditingId(null);
    setForm({
      date: new Date().toISOString().slice(0, 10),
      ...INITIAL_FORM,
    });
    setFormOpen(true);
    setNotice(null);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      title: row.title,
      date: (row.date || '').slice(0, 10),
      category: row.category || '학사',
      link: row.link || '',
      body: row.body || '',
    });
    setFormOpen(true);
    setNotice(null);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setNotice(null);

    const payload = {
      title: form.title.trim(),
      date: form.date,
      category: form.category,
      link: form.link.trim() || '',
      body: form.body.trim() || '',
    };

    if (!payload.title || !payload.date) {
      setNotice({ type: 'error', text: '제목과 날짜는 필수입니다.' });
      setSaving(false);
      return;
    }

    let error = null;
    if (editingId) {
      ({ error } = await supabase.from('notices').update(payload).eq('id', editingId));
    } else {
      ({ error } = await supabase.from('notices').insert(payload));
    }

    if (error) {
      setNotice({ type: 'error', text: `저장하지 못했습니다: ${error.message}` });
      setSaving(false);
      return;
    }

    setFormOpen(false);
    setEditingId(null);
    setNotice({ type: 'success', text: editingId ? '공지를 수정했습니다.' : '공지를 등록했습니다.' });
    await load();
    setSaving(false);
  };

  const remove = async (id) => {
    if (!supabase || !window.confirm('이 공지를 삭제할까요?')) return;
    setNotice(null);
    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (error) {
      setNotice({ type: 'error', text: `삭제하지 못했습니다: ${error.message}` });
      return;
    }
    setNotice({ type: 'success', text: '공지를 삭제했습니다.' });
    await load();
  };

  return (
    <>
      <h2>공지사항 관리</h2>
      <p className="admin-desc">검색·구분으로 빠르게 찾고, 표준 구분으로 일관되게 등록하세요.</p>

      <div className="admin-toolbar">
        <div className="admin-toolbar-row">
          <label className="admin-inline-field">
            검색
            <input
              type="search"
              value={filters.query}
              onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
              placeholder="제목/본문/링크 검색"
            />
          </label>
          <label className="admin-inline-field">
            구분
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
            >
              <option value="전체">전체</option>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFilters({ query: '', category: '전체' })}
          >
            필터 초기화
          </button>
        </div>
        <p className="admin-meta">총 {filteredList.length}건</p>
      </div>

      {notice ? (
        <p className={`admin-status ${notice.type === 'error' ? 'error' : 'success'}`}>
          {notice.text}
        </p>
      ) : null}

      {formOpen ? (
        <form onSubmit={save} className="admin-form">
          <label>제목 <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required placeholder="예: 2026학년도 1학기 수강신청 안내" /></label>
          <label>날짜 <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} required /></label>
          <label>
            구분
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>링크(선택) <input type="url" value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} placeholder="https://..." /></label>
          <label>본문(선택) <textarea value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} /></label>
          <div className="form-actions admin-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? '저장 중…' : (editingId ? '수정 저장' : '등록')}</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setFormOpen(false); setEditingId(null); }} disabled={saving}>취소</button>
          </div>
        </form>
      ) : (
        <button type="button" className="btn btn-primary" onClick={openNew} style={{ marginBottom: '1rem' }}>새 공지 추가</button>
      )}
      {loading ? <p>로딩 중…</p> : filteredList.length === 0 ? (
        <div className="admin-empty-state">
          <p>{list.length === 0 ? '등록된 공지가 없습니다. 새 공지를 추가해 주세요.' : '조건에 맞는 공지가 없습니다.'}</p>
          {!list.length && !formOpen ? (
            <button type="button" className="btn btn-secondary" onClick={openNew}>첫 공지 작성</button>
          ) : null}
        </div>
      ) : (
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
            {filteredList.map((row) => (
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
