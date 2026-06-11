## 개요

- [OpenF1 API](https://openf1.org/) 기반으로 포뮬러1 레이스 일정, 결과, 순위, 드라이버 정보를 한눈에 볼 수 있는 **F1 정보 대시보드** 웹 애플리케이션입니다.
- F1 공식 서비스가 아닌, 개인 학습 및 포트폴리오 목적으로 제작한 팬 사이트입니다.
- A fan-made Formula 1 information dashboard built with the OpenF1 API — providing race schedule, results, standings, and driver information at a glance.

<img width="1280" height="320" alt="MainTitle" src="https://github.com/user-attachments/assets/9b8e29fe-6f4e-457d-883b-a6c0157c8bd7" />
<img width="1921" height="580" alt="image" src="https://github.com/user-attachments/assets/c5392956-11d8-4c4e-9cc6-c3b276232e4e" />

<br/>

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Chart**: Recharts
- **Icons**: Lucide React, React Icons
- **Data**: OpenF1 API, RSS (rss-parser)

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 홈 — 다가오는 레이스, 포디움, 최근 레이스 결과 |
| `/schedule` | 시즌 일정 — 다가오는 레이스 및 세션(FP, Qualifying, Sprint, Race) |
| `/standings` | 챔피언십 순위 — 드라이버 / 컨스트럭터 |
| `/drivers` | 2026 시즌 드라이버 목록 |
| `/driverChart` | 드라이버별 시즌 성적 차트 (Recharts) |
| `/board` | 커뮤니티 게시판 (UI 프로토타입) |
| `/news` | 홈 `#news` 섹션으로 리다이렉트 |

## 주요 기능

### 구현 완료

- 📅 **다가오는 레이스 일정** — 서킷 이미지, 세션별 일정 표시
- 🏆 **최근 레이스 포디움** — 팀 컬러 기반 포디움 시각화
- 🏁 **최근 레이스 결과** — Race / Qualifying / Sprint / Practice 탭 전환
- 📊 **챔피언십 순위** — 드라이버·컨스트럭터 순위 및 프로그레스 바
- 👤 **드라이버 목록** — OpenF1 API 연동, 한글 이름·팀·국적 표시
- 📈 **드라이버 성적 차트** — 라운드별 순위·포인트 추이
- 🌐 **한글화** — 드라이버/팀 이름, 국가 코드 한글 변환

### 개발 중 / Coming Soon

- 📰 **최신 뉴스** — RSS 파싱 및 API(`/api/news`) 구현 완료, 홈 화면 노출은 비활성화 상태
- 🗣️ **커뮤니티** — `/board` UI 프로토타입 (목업 데이터)
- 🌓 **다크 모드** — Navbar 토글 UI만 존재, 전역 테마 전환 미완성

## 프로젝트 구조

```
formula1_Dashboard/
├── app/
│   ├── layout.tsx                    # 루트 레이아웃 (Navbar, Footer)
│   ├── globals.css                   # 전역 스타일
│   ├── (site)/                       # 페이지 라우트
│   │   ├── page.tsx                  # 홈
│   │   ├── schedule/page.tsx         # 일정
│   │   ├── standings/page.tsx        # 순위
│   │   ├── drivers/page.tsx          # 드라이버
│   │   ├── driverChart/              # 드라이버 차트
│   │   ├── board/page.tsx            # 커뮤니티
│   │   └── news/page.tsx             # 뉴스 리다이렉트
│   └── api/
│       └── news/route.ts             # RSS 뉴스 API
├── components/
│   ├── common/                       # 공통 컴포넌트
│   │   ├── navbar/Navbar.tsx
│   │   ├── footer/Footer.tsx
│   │   ├── newsSection/NewsSection.tsx
│   │   ├── layoutFormat/LayoutFormat.tsx
│   │   └── notFound/NotFound.tsx
│   ├── homePage/                     # 홈·일정·순위 관련
│   │   ├── podiumSection/
│   │   ├── upcomingRaces/
│   │   ├── raceResults/
│   │   ├── championshipStandings/
│   │   └── driverSection/
│   ├── driverChart/
│   │   └── DriverRankChart.tsx
│   └── boardPage/
│       └── gridSection/GridSection.tsx
├── lib/
│   ├── openf1.ts                     # OpenF1 API 유틸 (한글 변환, 드라이버 매핑)
│   ├── types/types.ts
│   ├── utils/driverUtils.ts
│   └── api/
│       ├── nextRacesApi/
│       ├── lastResults/              # Race, Qualifying, Sprint, Practice
│       ├── currentDriverChampion/
│       ├── currentCustrutor/
│       ├── lastestMeeting/
│       ├── sessionResultApi/
│       ├── driverResultChartData/
│       └── newsParser/
├── assets/img/                       # 정적 이미지 (car, circuit, driverProfile, flag, logo, teamLogo)
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

## 디자인 특징

- F1 레드 액센트 컬러 (`#FF3B30`)
- 라이트 테마 기반 카드 레이아웃
- 호버 효과 및 전환 애니메이션 (`animate-fade-in`, `animate-slide-up` 등)
- 모바일 반응형 네비게이션 (햄버거 메뉴)

## 데이터 소스

- **레이스·드라이버·순위 데이터**: [OpenF1 API](https://api.openf1.org/)
- **뉴스 데이터**: Formula1.com, Motorsport.com RSS 피드

## 개발 타임라인

### Phase 1–2: 기반 구축 및 API 연동

- Next.js 14 (App Router) + TypeScript + Tailwind CSS 프로젝트 설정
- OpenF1 API 연동 및 TypeScript 타입 정의
- 드라이버/팀 한글 번역, 국가 코드 변환, 프로필·로고 매핑 (`lib/openf1.ts`)

### Phase 3–7: 핵심 UI 및 데이터 섹션

- Navbar, Footer, 반응형 네비게이션
- 포디움, 다가오는 레이스, 레이스 결과, 챔피언십 순위 섹션
- Race / Qualifying / Sprint / Practice 결과 API 연동

### Phase 8–10: 페이지 확장 및 최적화

- 드라이버 페이지 (`/drivers`)
- API 타임아웃·에러 처리, ISR 재검증, 이미지 최적화

### Phase 11–14: 추가 기능

- 뉴스 RSS 파싱 및 `/api/news` Route Handler (`NewsSection`, `newsParser`)
- 드라이버 성적 차트 페이지 (`/driverChart`, Recharts)
- 일정·순위 독립 페이지 분리 (`/schedule`, `/standings`)
- 커뮤니티 게시판 UI 프로토타입 (`/board`)

## 참고 사이트

이 프로젝트는 [F1 BoxBox](https://f1-boxbox.com/ko)를 참고하여 제작되었습니다.

## 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.
