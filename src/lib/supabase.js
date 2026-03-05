import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const isSupabaseConfigured = () => !!supabase;

/** Storage 버킷 'gallery'의 공개 URL */
export function getGalleryPublicUrl(path) {
  if (!supabaseUrl || !path) return '';
  const base = supabaseUrl.replace(/\/$/, '') + '/storage/v1/object/public/gallery';
  return path.startsWith('http') ? path : `${base}/${path.replace(/^\//, '')}`;
}
