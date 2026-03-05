import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, getGalleryPublicUrl } from '../lib/supabase';

export function useGallery(limit = 24) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from('gallery_items')
      .select('id, title, caption, image_path, sort_order, created_at')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(limit)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && Array.isArray(data)) {
          setItems(data.map((row) => ({
            ...row,
            imageUrl: getGalleryPublicUrl(row.image_path),
          })));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => { cancelled = true; };
  }, [limit]);

  return { galleryItems: items, loading };
}
