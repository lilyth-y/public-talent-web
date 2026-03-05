# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
한신대학교 공공인재학부 공식 웹사이트. React 19 + Vite 7 SPA로, Supabase(선택적)를 BaaS로 사용합니다.

### Development commands
- **Dev server:** `npm run dev` (Vite, default port 5173)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Preview:** `npm run preview`

### Local Supabase setup
Admin 패널(`/admin`) 테스트를 위해 로컬 Supabase가 필요합니다:
1. Docker 데몬 실행: `sudo dockerd &>/tmp/dockerd.log &` (이미 실행 중이면 생략)
2. `sudo chmod 666 /var/run/docker.sock` (권한 필요 시)
3. `supabase start` (프로젝트 루트에서, 최초 실행 시 ~1분 소요)
4. 스키마 적용: `docker exec -i supabase_db_workspace psql -U postgres -d postgres < docs/supabase-schema.sql`
5. Storage 버킷 생성 (gallery): `curl -s -X POST "http://127.0.0.1:54321/storage/v1/bucket" -H "Authorization: Bearer $(supabase status -o env | grep SERVICE_ROLE_KEY | cut -d'"' -f2)" -H "Content-Type: application/json" -d '{"id":"gallery","name":"gallery","public":true}'`
6. `.env` 파일 생성 (`supabase status -o env`로 `API_URL` → `VITE_SUPABASE_URL`, `ANON_KEY` → `VITE_SUPABASE_ANON_KEY` 매핑)
7. 테스트 계정 생성: Supabase Auth API 또는 Studio(`http://127.0.0.1:54323`)에서 이메일/비밀번호 사용자 등록

### Key notes
- Supabase 연동 없이도 공개 페이지가 정상 동작합니다 (정적 JSON 폴백: `src/data/notice.json`, `src/data/faculty.js`).
- ESLint에 기존 7개 에러가 있으나 (`react-hooks/set-state-in-effect`, `no-unused-vars`, `react-refresh/only-export-components`), 프로젝트의 기존 코드에서 발생하는 것입니다.
- Vite dev 서버는 `.env` 변경 시 재시작 필요 (HMR로 반영되지 않음).
- dev 서버 실행 시 `--host 0.0.0.0`을 추가하면 외부 접근이 가능합니다.
