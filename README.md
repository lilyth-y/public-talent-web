# 한신대학교 공공인재빅데이터융합학 홈페이지

React + Vite SPA. 공지·갤러리·활동은 Supabase(선택)로 관리합니다.

- **실행**: `npm install` → `npm run dev` (환경 변수는 `.env.example` 참고)
- **공용 운영·공동개발·데이터 교내 이전**: [docs/공용_운영_및_환경_가이드.md](docs/공용_운영_및_환경_가이드.md)
- **졸업 후 학교 인수인계·일상 관리**: [docs/인수인계_관리_가이드.md](docs/인수인계_관리_가이드.md)

---

아래는 Vite 기본 설명입니다.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
