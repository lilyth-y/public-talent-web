import { useEffect } from 'react';

const SITE_NAME = '한신대학교 공공인재빅데이터융합학';

const TITLE_MAP = {
  '/': SITE_NAME,
  '/about': `학부소개 | ${SITE_NAME}`,
  '/about/greeting': `학과장 인사말 | ${SITE_NAME}`,
  '/about/location': `찾아오시는 길 | ${SITE_NAME}`,
  '/faculty': `교수진 | ${SITE_NAME}`,
  '/academic': `학사정보 | ${SITE_NAME}`,
  '/academic/notice': `공지사항 | ${SITE_NAME}`,
  '/academic/admission': `입학안내 | ${SITE_NAME}`,
  '/academic/curriculum': `교과과정 | ${SITE_NAME}`,
  '/academic/career': `취업·진로 | ${SITE_NAME}`,
  '/academic/graduation': `졸업요건 | ${SITE_NAME}`,
  '/students': `학생지원 | ${SITE_NAME}`,
  '/community': `소식·갤러리 | ${SITE_NAME}`,
};

export function useDocumentTitle(pathname) {
  useEffect(() => {
    const base = pathname.split('/').slice(0, 3).join('/') || '/';
    const exact = TITLE_MAP[pathname];
    const byBase = TITLE_MAP[base];
    const title = exact || byBase || SITE_NAME;
    document.title = title;
    return () => {
      document.title = SITE_NAME;
    };
  }, [pathname]);
}
