## 개요

- 포뮬러1 레이스 일정, 결과, 순위, 드라이버 정보를 한눈에 볼 수 있는 대시보드 웹 애플리케이션입니다.
- A dashboard web application that provides a quick, at-a-glance view of Formula 1 race schedule, results, rankings, and driver information.

<img width="1280" height="320" alt="MainTitle" src="https://github.com/user-attachments/assets/9b8e29fe-6f4e-457d-883b-a6c0157c8bd7" />
<img width="1508" height="734" alt="image" src="https://github.com/user-attachments/assets/b5f80f09-7c4c-4f96-93cb-d8d783c07fd9" />
<br/>

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 주요 기능

- 📅 다가오는 레이스 일정 (upcoming race schedule)
- 🏁 최근 레이스 결과 (the results of the latest race)
- 🏆 챔피언십 순위 (드라이버/컨스트럭터) [Championship Ranking (Driver/Construtor)]
- 📱 반응형 디자인 (responsive design)

### Comming Soon

- 📰 최신 뉴스 (the latest news)
- 🌓 다크 모드 지원 (dark mod)
- 🗣️ 커뮤니티 (cummunity)

## 프로젝트 구조

```
formula1_Dashboard/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈 페이지
│   ├── globals.css               # 전역 스타일
│   └── drivers/
│       └── page.tsx              # 드라이버 페이지
├── components/                   # React 컴포넌트
│   ├── navbar/
│   │   ├── Navbar.tsx            # 상단 네비게이션
│   │   └── components/
│   ├── footer/
│   │   ├── Footer.tsx            # 푸터
│   │   └── components/
│   ├── podiumSection/
│   │   ├── Podium.tsx            # 포디움 컴포넌트 (구버전)
│   │   ├── PodiumNew.tsx         # 포디움 컴포넌트 (신버전)
│   │   └── components/
│   ├── upcomingRaces/
│   │   ├── UpcomingRacesSection.tsx  # 다가오는 레이스 섹션
│   │   ├── upcomingRacesType/
│   │   │   └── UpcomingRacesType.tsx
│   │   └── components/
│   │       ├── circuit/
│   │       │   └── CircuitSection.tsx
│   │       ├── header/
│   │       │   └── HeaderSection.tsx
│   │       └── raceType/
│   │           └── RaceTypeList.tsx
│   ├── raceResults/
│   │   ├── RaceResults.tsx       # 레이스 결과 섹션
│   │   └── components/
│   │       ├── DataTable.tsx     # 결과 데이터 테이블
│   │       ├── HeaderSection.tsx # 섹션 헤더
│   │       └── RacingTypeTabMenu.tsx  # 레이스 타입 탭 메뉴
│   ├── championshipStandings/
│   │   ├── ChampionshipStandings.tsx  # 챔피언십 순위 섹션
│   │   └── components/
│   │       ├── ConstructorSection.tsx # 컨스트럭터 순위
│   │       └── HeaderSection.tsx
│   ├── driverSection/
│   │   ├── DriversSection.tsx    # 드라이버 섹션
│   │   └── components/
│   ├── newsSection/
│   │   ├── NewsSection.tsx        # 뉴스 섹션
│   │   └── components/
│   └── notFound/
│       └── NotFound.tsx           # 404 에러 페이지
├── lib/                           # 유틸리티 및 API
│   ├── api/                       # API 호출 함수들
│   │   ├── currentCustrutor/
│   │   │   └── CurrentConstrutor.ts
│   │   ├── currentDriverChampion/
│   │   │   └── CurrentDriverChampion.ts
│   │   ├── lastestMeeting/
│   │   │   └── lastestMeeting.ts
│   │   ├── lastResults/
│   │   │   ├── lastRaceResultApi/
│   │   │   │   └── lastRaceResult.ts
│   │   │   ├── lastQualifyApi/
│   │   │   │   └── lastQualifyApi.ts
│   │   │   ├── lastSprintApi/
│   │   │   │   └── LastSprintApi.tsx
│   │   │   └── lastPracticeApi/
│   │   │       └── lastPracticeApi.ts
│   │   ├── nextRacesApi/
│   │   │   └── nextRacesApi.ts
│   │   └── sessionResultApi/
│   │       └── sessionResultApi.ts
│   ├── openf1.ts                 # OpenF1 API 유틸리티 (한글 변환, 드라이버 매핑)
│   ├── types/
│   │   └── types.ts              # TypeScript 타입 정의
│   └── utils/
│       └── driverUtils.ts         # 드라이버 관련 유틸리티
├── assets/                        # 정적 이미지 리소스
│   └── img/
│       ├── car/                   # 팀별 레이싱 카 이미지
│       ├── champion/              # 챔피언 이미지
│       ├── circuit/               # 서킷 이미지
│       ├── driverProfile/         # 드라이버 프로필 이미지 (팀별)
│       ├── error/                 # 에러 이미지
│       ├── flag/                  # 국기 이미지
│       ├── logo/                  # 로고 이미지
│       ├── podium/                # 포디움 이미지
│       └── teamLogo/              # 팀 로고 이미지
├── package.json                   # 프로젝트 의존성
├── tsconfig.json                  # TypeScript 설정
├── tailwind.config.ts             # Tailwind CSS 설정
├── next.config.mjs                # Next.js 설정
└── postcss.config.mjs             # PostCSS 설정
```

## 디자인 특징

- F1 공식 컬러 팔레트 사용 (#E10600)
- 다크 테마 기반 디자인
- 카드 기반 레이아웃
- 호버 효과 및 전환 애니메이션
- 모바일 반응형 네비게이션

## 개발 타임라인

### Phase 1: 프로젝트 초기 설정 및 기반 구축

- Next.js 14 (App Router) 프로젝트 생성
- TypeScript 설정 및 타입 정의
- Tailwind CSS 설정 및 전역 스타일 구성
- 기본 레이아웃 구조 설계 (`app/layout.tsx`, `app/page.tsx`)

### Phase 2: OpenF1 API 연동 및 데이터 변환 시스템

- OpenF1 API 구조 분석 및 연동
- API 응답 데이터를 위한 TypeScript 타입 정의 (`lib/types/types.ts`)
- 드라이버/팀 이름 한글 번역 매핑 시스템 구축 (`lib/openf1.ts`)
- 국가 코드 한글 변환 매핑
- 드라이버 프로필 이미지 및 팀 로고 매핑 시스템
- 데이터 변환 유틸리티 함수 구현 (`transformOpenF1Driver`, `translateDriverName` 등)

### Phase 3: 기본 UI 컴포넌트 개발

- **Navbar 컴포넌트**: 상단 네비게이션 바 구현
- **Footer 컴포넌트**: 푸터 섹션 구현
- 반응형 네비게이션 메뉴 (모바일 햄버거 메뉴)

### Phase 4: 포디움 섹션 구현

- 최근 레이스 포디움 시각화 컴포넌트 개발 (`Podium.tsx`, `PodiumNew.tsx`)
- 3D 효과 및 애니메이션 구현
- 팀 컬러 기반 시각적 표현
- 호버 효과 및 인터랙션 추가

### Phase 5: 다가오는 레이스 섹션

- **UpcomingRacesSection 컴포넌트**: 다가오는 레이스 목록 표시
- **CircuitSection 컴포넌트**: 서킷 정보 및 이미지 표시
- **RaceTypeList 컴포넌트**: 레이스 타입별 일정 표시 (FP1, FP2, FP3, Qualifying, Sprint, Race)
- **HeaderSection 컴포넌트**: 섹션 헤더 구현
- Next Races API 연동 (`lib/api/nextRacesApi/`)

### Phase 6: 레이스 결과 섹션

- **RaceResults 컴포넌트**: 최근 레이스 결과 표시
- **RacingTypeTabMenu 컴포넌트**: 탭 메뉴 구현 (Race, Qualifying, Sprint, Practice)
- **DataTable 컴포넌트**: 결과 데이터 테이블 표시
- **HeaderSection 컴포넌트**: 섹션 헤더
- 레이스 결과 API 연동 (`lib/api/lastResults/`)
  - 레이스 결과 (`lastRaceResultApi`)
  - 퀄리파이 결과 (`lastQualifyApi`)
  - 스프린트 결과 (`lastSprintApi`)
  - 프렉티스 결과 (`lastPracticeApi`)

### Phase 7: 챔피언십 순위 섹션

- **ChampionshipStandings 컴포넌트**: 드라이버/컨스트럭터 순위 표시
- **ConstructorSection 컴포넌트**: 컨스트럭터 순위 섹션
- **HeaderSection 컴포넌트**: 섹션 헤더 및 탭 전환
- 드라이버 순위 시각화 (프로그레스 바, 팀 컬러 적용)
- 컨스트럭터 순위 시각화
- 챔피언십 데이터 API 연동 (`lib/api/currentDriverChampion/`, `lib/api/currentCustrutor/`)

### Phase 8: 드라이버 페이지

- **DriversSection 컴포넌트**: 드라이버 목록 표시
- 드라이버 프로필 이미지 통합
- 드라이버 상세 정보 표시 (`app/drivers/page.tsx`)

### Phase 9: 스타일링 및 애니메이션

- F1 공식 컬러 팔레트 적용
- 다크 테마 기반 디자인 완성
- 카드 기반 레이아웃 스타일링
- 호버 효과 및 전환 애니메이션 추가
- 반응형 디자인 최적화 (모바일, 태블릿, 데스크톱)
- CSS 애니메이션 최적화 (`animate-fade-in`, `animate-slide-up` 등)

### Phase 10: 에러 처리 및 최적화

- API 요청 타임아웃 처리
- 에러 상태 처리 (`NotFound.tsx` 컴포넌트)
- 데이터 재검증 설정 (ISR)
- 성능 최적화 (코드 스플리팅, 이미지 최적화)

### Phase 11: 추가 기능 및 개선

- 뉴스 섹션 컴포넌트 준비 (`NewsSection.tsx`)
- 세션 결과 API 연동 (`lib/api/sessionResultApi/`)
- 최신 미팅 정보 API 연동 (`lib/api/lastestMeeting/`)

## 참고 사이트

이 프로젝트는 [F1 BoxBox](https://f1-boxbox.com/ko)를 참고하여 제작되었습니다.

## 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.
