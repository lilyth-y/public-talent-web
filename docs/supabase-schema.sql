-- 한신대 공공인재학부 홈페이지 - Supabase 스키마
-- Supabase 대시보드 > SQL Editor에서 순서대로 실행하세요.

-- 1. 공지사항 테이블
CREATE TABLE IF NOT EXISTS public.notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL DEFAULT '학사',
  link TEXT DEFAULT '',
  body TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 갤러리 테이블 (이미지 경로 + 메타)
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  image_path TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. RLS 활성화
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- 4. 공지: 누구나 읽기, 로그인 사용자만 쓰기
CREATE POLICY "notices_select_public" ON public.notices FOR SELECT USING (true);
CREATE POLICY "notices_insert_auth" ON public.notices FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "notices_update_auth" ON public.notices FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "notices_delete_auth" ON public.notices FOR DELETE USING (auth.role() = 'authenticated');

-- 5. 갤러리: 누구나 읽기, 로그인 사용자만 쓰기
CREATE POLICY "gallery_select_public" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "gallery_insert_auth" ON public.gallery_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "gallery_update_auth" ON public.gallery_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "gallery_delete_auth" ON public.gallery_items FOR DELETE USING (auth.role() = 'authenticated');

-- 6. Storage 버킷 'gallery' 생성은 대시보드 Storage에서 수동 생성 후,
--    Policies: Public read (SELECT), Authenticated insert/update/delete

-- 7. (선택) updated_at 자동 갱신
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS notices_updated_at ON public.notices;
CREATE TRIGGER notices_updated_at
  BEFORE UPDATE ON public.notices
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
