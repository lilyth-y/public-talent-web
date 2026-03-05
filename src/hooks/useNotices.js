import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { noticeList as fallbackList } from '../data/notices';

const HOME_NEWS_LIMIT = 3;

export function useNotices() {
  const [list, setList] = useState(fallbackList);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from('notices')
      .select('id, title, date, category, link')
      .order('date', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && Array.isArray(data)) {
          setList(data.map((row) => ({
            id: row.id,
            title: row.title,
            date: row.date,
            category: row.category || '학사',
            link: row.link || '',
          })));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => { cancelled = true; };
  }, []);

  return {
    noticeList: list,
    loading,
    homeLimit: HOME_NEWS_LIMIT,
  };
}
