# DS Reference

Python 데이터 사이언스 핵심 레퍼런스 모음 — Next.js + Vercel

## 라이브러리 목록

| 슬러그 | 라이브러리 | 섹션 |
|--------|-----------|------|
| numpy | NumPy | 9 |
| pandas | Pandas | 11 |
| matplotlib | Matplotlib | 9 |
| scipy | SciPy | 11 |
| sklearn | Scikit-learn | 9 |
| statsmodels | Statsmodels | 7 |
| xgboost | XGBoost | 6 |
| crawling | Crawling & DB | 5 |
| ml_classification | ML Classification | 6 |

## 개발

```bash
npm install
npm run dev
```

## Vercel 배포

```bash
# Vercel CLI
npm i -g vercel
vercel

# 또는 GitHub 연결 후 자동 배포
```

## 구조

```
app/
  page.tsx              ← 메인 (카드 그리드)
  layout.tsx
  globals.css
  lib/
    libraries.ts        ← 라이브러리 메타데이터
  reference/[slug]/
    page.tsx            ← SSG 서버 컴포넌트
    RefClient.tsx       ← 클라이언트 (사이드바 + 아코디언)
public/
  data/
    numpy.json          ← 섹션별 HTML 데이터
    pandas.json
    ...
```
