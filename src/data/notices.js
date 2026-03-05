/**
 * 공지·소식 목록. 홈 "최신 소식", 학사정보 > 공지사항, 소식·갤러리에서 공통 사용.
 * 수정 방법: docs/공지_등록_방법.md 참고.
 */
import noticeData from './notice.json';

export const noticeList = Array.isArray(noticeData) ? noticeData : [];

/** 홈 최신 소식에 노출할 개수 */
export const HOME_NEWS_LIMIT = 3;
