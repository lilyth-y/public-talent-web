import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, getGalleryPublicUrl } from '../lib/supabase';

export function useActivityPosts(limit = 100) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from('activity_posts')
      .select('id, date, title, summary, body, cover_image_path, sort_order, created_at')
      .order('sort_order', { ascending: true })
      .order('date', { ascending: false })
      .limit(limit)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && Array.isArray(data)) {
          setPosts(data.map((row) => ({
            ...row,
            coverImageUrl: row.cover_image_path ? getGalleryPublicUrl(row.cover_image_path) : null,
          })));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => { cancelled = true; };
  }, [limit]);

  return { activityPosts: posts, loading };
}
