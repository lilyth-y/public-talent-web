# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
한신대학교 공공인재학부 공식 웹사이트. React 19 + Vite 7 SPA로, Supabase(선택적)를 BaaS로 사용합니다.

### Development commands
- **Dev server:** `npm run dev` (Vite, default port 5173)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Preview:** `npm run preview`

### Key notes
- Supabase 연동 없이도 공개 페이지가 정상 동작합니다 (정적 JSON 폴백: `src/data/notice.json`, `src/data/faculty.js`).
- Admin 패널(`/admin`)은 Supabase 환경변수(`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)가 `.env`에 설정되어야 작동합니다.
- ESLint에 기존 7개 에러가 있으나 (`react-hooks/set-state-in-effect`, `no-unused-vars`, `react-refresh/only-export-components`), 프로젝트의 기존 코드에서 발생하는 것입니다.
- dev 서버 실행 시 `--host 0.0.0.0`을 추가하면 외부 접근이 가능합니다.
