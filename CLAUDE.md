# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude를 위한 맥락과 규칙이에요.

## 프로젝트 개요

- OpenF1 API 기반 F1 정보 대시보드 (개인 포트폴리오 프로젝트, 1인 개발)
- Next.js 14 App Router, TypeScript, Tailwind CSS, Recharts
- 주요 페이지: `/` 홈, `/result`, `/schedule`, `/standings`, `/driverChart`, `/board`(UI 프로토타입)
- 데이터 조회는 `lib/api/*`에 있고, 서버 컴포넌트에서 `fetch(..., { next: { revalidate: 3600 } })`로 캐싱
- 드라이버·팀 한글명/색상/로고 매핑은 `lib/utils/driverUtils.ts`

## 이 프로젝트의 목표 (취업용 고도화)

이력서에 "직접 측정한 성능 개선"과 "AI 기능을 제품에 넣은 경험"을 더하는 게 목적이에요.
사용자는 면접에서 모든 설계 결정을 직접 설명할 수 있어야 해요.

**방향 (2026-11-20 변경)**: 기능 단위가 아니라 **페이지 단위로, 홈부터 차례로** 개선해요.
홈의 기본 틀은 최근 레이스 정보, 최근 레이스 포디움, 최근 레이스 순위(FP1·FP2·FP3·퀄리파잉·스프린트·레이스)예요.
AI 기능은 이 작업과 모바일 확인이 끝난 뒤 고도화 단계로 미뤘어요.

### 알려진 문제

- 홈(`app/(site)/page.tsx`, `PodiumNew`, `RaceResults`, `UpcomingRaceLink`): 페이지와 세 섹션이 모두 `"use client"`이고 `useEffect` 안에서 데이터를 조회함. 서버가 보내는 HTML에는 로딩 스켈레톤만 있고, JS 실행 후에 외부 API 호출이 시작됨. 클라이언트에서는 `next: { revalidate }` 서버 캐싱이 적용되지 않을 것으로 보임(측정으로 확인 필요)
- 홈: `getLastRaceResult`가 `PodiumNew`와 `RaceResults`에서 각각 호출됨(중복). `RaceResults`는 호출이 두 단계(라운드·FP1·스프린트·퀄리파잉 → FP2·FP3)로 나뉨
- 홈 기준선: Lighthouse LCP 중앙값 7657ms, 3회 편차 큼(`docs/perf-baseline.md`). TTFB는 빈 껍데기 응답이라 개선 지표로 쓸 수 없음. LCP 요소는 아직 확인 못 함
- `app/(site)/driverChart/page.tsx`: 요청마다 24라운드를 각각 호출(`Promise.all` 24회), 아직 열리지 않은 미래 라운드도 요청함. 현재 UI에서 접근 경로가 없음 (설계안은 아래 참고)
- 차트 컴포넌트가 `components/driverChart/DriverRankChart.tsx` 하나뿐이고 공용 차트 구조가 없음
- 모바일 환경 확인 안 함
- 테스트와 CI가 없음

### 진행 순서

날짜는 정하지 않았어요. 단계가 끝나면 다음 단계로 넘어가요.

**1단계: 홈 개선**
1. 기준선 보강: LCP 요소, 브라우저가 로드 중 보내는 외부 요청 수, Lighthouse 반복 횟수 확대 → `docs/perf-baseline.md`
2. 홈을 서버 컴포넌트로 전환. 데이터는 서버에서 가져오고 클라이언트 컴포넌트는 탭 전환·hover 같은 상호작용만 남김. 섹션 하나씩 진행
3. 섹션별 `Suspense` 스트리밍, 중복 호출 제거
4. 1단계에서 확인한 LCP 요소에 맞춘 이미지 최적화
5. 같은 조건으로 재측정, 전후 비교 기록

**2단계: 모바일 확인**
- 홈을 모바일 환경에서 확인하고 문제를 정리·수정 (Lighthouse는 모바일 에뮬레이션이 기본값이므로 측정 조건에 formFactor를 같이 기록)

**3단계: 기능 추가 (순서 미정)**
- 선수별 시즌 순위 차트(`/driverChart`): 시즌 결과를 페이지 단위로 받아 병합하고 집계본을 `unstable_cache`로 캐싱하는 B안으로 설계됨(요청 24개 → 약 5~6개). 공용 차트 구조와 순수 함수 분리, Vitest는 이때 함께 진행
- 최근 뉴스 섹션 (`NewsSection`은 현재 홈에서 주석 처리됨)
- **홈 개편 계획 (2026-11-24 구상, 착수 시기 미정)**: 홈을 아래 순서로 재구성한다.
  1. 다음 레이스 링크 2. 최근 레이스 순위 3. 최신 뉴스 4. 포뮬러 동영상(유튜브) 5. 챔피언십 순위 6. 하이라이트
  - 기존 카르쉘(포디움)과 최근 레이스 세션별 결과(FP·퀄리파잉·스프린트·레이스)는 별도 결과 페이지로 옮긴다
  - 미정: 뉴스·영상의 출처와 이용 조건(라이선스가 명확해야 함, 유튜브는 iframe 임베드 우선 검토), 동영상과 하이라이트 섹션을 합칠지 나눌지

**4단계: 고도화 (AI 기능, 자연어 질문 → 차트 생성)**
- Vercel AI SDK 설치, 서버 API 라우트(API 키는 서버 환경 변수), 텍스트 스트리밍 확인
- OpenF1 조회 함수 2~3개를 tool로 등록, 질문 → `ChartSpec` 구조화 출력(zod 검증)
- 질문 UI: 진행 단계 표시, 차트 렌더링, 취소·재시도·에러, 미지원 질문 안내
- 예시 질문 20개로 점검, 프롬프트 개선, 응답 캐싱, 요청 횟수 제한
- Vercel 배포, README 시연 GIF, 회고 정리

핵심 아이디어: 3단계에서 만드는 `ChartSpec`을 4단계 LLM 구조화 출력 형식으로 그대로 사용해요.

### 진행 상황과 결정 사항 (2026-11-26 기준)

**끝난 것**
- 미사용 정리: 중복 파일, `prisma`·`tsx` 의존성, 구버전 `Podium`, `/drivers` 페이지와 `lib/openf1.ts`, 미사용 이미지·타입
- 홈 개선 1차: `PodiumNew`를 서버 컴포넌트로 전환, 첫 카드 이미지 `priority`, 드라이버 사진 `unoptimized` 제거. 브라우저의 Jolpica 요청 6건 → 4건. **LCP 수치는 구간 합계와 맞지 않아 해석 보류**(`docs/perf-baseline.md`)
- API 실패 처리: 서버용 `fetchLastRaceResult`·`fetchLastestMeeting`(오류를 던짐)과 기존 `get*`(오류 시 `null`) 분리, `app/(site)/error.tsx` 추가
- 모바일 확인(홈, 일정, 순위): 가로 넘침 없음. 하단 빈 공간은 원인 미확인
- 일정 시간을 한국 시간(KST)으로 표시(`lib/utils/dateUtils.ts`)
- 서킷 이미지를 OpenF1 위치 데이터로 만든 SVG 23곡으로 교체(위키미디어 후보는 스타일 불일치로 미채택)
- 일정 탭(2026-11-24): `getSeasonSchedule`(`current.json` 1회)로 시즌 전체 목록을 받고, 다음 레이스는 `lib/utils/scheduleUtils.ts`의 `findNextRace`(레이스 시작 + 3시간까지 "다음 레이스")로 골라 쓴다. `getNextRaces()` 별도 호출 제거(일정 페이지 외부 요청 1건). 실제 23라운드로 검증(`next.json`과 같은 22라운드). 일정 컴포넌트는 `components/schedulePage/`로 이동(`UpcomingRaceLink`만 홈에 남음). 로딩 스켈레톤(`ScheduleSkeleton`), 시즌 전체 카드 UI, 다음다음 레이스 그리드(`NextNextRace`), D-day(`getDDayLabel`, 한국 날짜 기준, 당일 "D-Day"/이전 "D-N"/이후 "D+N") 적용
- Jolpica 403 해결(2026-11-25): 원인은 서버(Node) `fetch`에 User-Agent가 없어 Cloudflare가 막은 것. `fetchJolpica`에 `User-Agent` 헤더 추가. 브라우저·curl은 UA가 있어 통과했음
- 디자인 개편(2026-11-25, 홈·일정·순위 적용, 커밋 `c349da3`·`dcc75f7`·`c0d5360`): 기존 디자인이 "AI가 만든 느낌"이라 바꿨다
  - 밝은 "종이" 톤 배경, 포인트 색 없음, 색은 팀 색만 사용. 토큰은 `tailwind.config.ts`(paper/asphalt/rule/muted)
  - 폰트: 본문 IBM Plex Sans KR(`preload:false`), 숫자·제목 Archivo(`wdth` 축). `app/layout.tsx`
  - 포디움: `PodiumStage` — 1위 큰 배너 + 2·3위 배너, 팀 색 그라데이션, 큰 드라이버 번호, 우하단 누끼 이미지. 연석 장식은 제거. 정상 결과가 아닐 때(취소·챔피언·빈 값)는 기존 `DriverCardSlider`로 대체
  - 순위·결과 표는 카드 대신 헤어라인 목록 구조(`StandingRow`, `DataTable`)
  - 시도 후 되돌린 것: 어두운 중계 화면 톤(다크). 이유: 여전히 AI 느낌이었고 사용자가 밝은 톤을 선택
  - 교훈: 디자인은 사용자가 레퍼런스를 주고 방향을 정할 때 결과가 좋았다. 내가 먼저 방향을 정해 적용하면 어긋났다
- UAE 국기 수정: `AbuDhabiFlag.svg`가 실제로는 팔레스타인 국기였음 → 올바른 UAE 국기로 교체(사용자가 직접). 12/6 아부다비 전 과제 해결
- `getDriverHeadshotUrl`과 드라이버 사진 14장 복구(`assets/img/driverProfile/`). 카마라(#51)는 사진 없음
- 컴포넌트 폴더를 페이지 기준으로 이동(2026-11-26, `acb76ae`): `podiumSection`·`raceResults` → `components/resultsPage/`, `championshipStandings` → `components/standingsPage/`. `UpcomingRaceLink`는 `homePage/`에 남김
- 결과 페이지 `/result` 생성과 메뉴 추가(2026-11-26, `5b6e6f2`): `RaceResults showPodium`이면 선택한 탭의 상위 3명을 `PodiumStage`로 표시(`currentResults` → `PodiumDriver` 변환, 이미지는 `getDriverImageUrl(번호)`). 넓은 화면은 2열 그리드(포디움 왼쪽), 좁은 화면은 포디움이 위. 홈은 `showPodium` 없이 표만 보이고, 포디움은 기존 `PodiumNew`를 그대로 씀. 타입 오류 수정은 `51ca60b`
  - 이유: 클라이언트 컴포넌트에서 `async` 서버 컴포넌트 `PodiumNew`는 import할 수 없지만, 받은 데이터를 그리기만 하는 `PodiumStage`는 가능
  - 포디움 너비가 탭마다 바뀌던 원인: 너비 지정 없는 flex 안에서 이름 길이에 맞춰 크기가 정해짐 → 2열 그리드로 고정
- `DataTable`을 `raceResults/components/DataTable/` 폴더로 분리(`index`, `DesktopResultRow`, `MobileResultCard`, `PositionBadge`, `DriverInfo`, `types`). `EmptyOrLoading`은 `components/common/emptyOrLoading/`로 이동(문구와 `<tr>` 마크업은 아직 결과 표 전용)

**진행 중**
- 홈 개편: 결과 페이지 분리까지 완료. 새 홈은 각 페이지의 핵심 컴포넌트를 간략히 모아 보여주는 역할로 보고, 원본 페이지를 먼저 만든 뒤 마지막에 조립한다. 그때까지 기존 홈 유지(포트폴리오 열람 가능성 때문에 비우지 않음). 홈 자리: 다음 레이스(일정)·최근 결과(`/result`)·챔피언십(순위)·최신 뉴스(뉴스)
- 다음 작업 후보: 홈에 뉴스 제목 목록(제목·출처·시간·원문 링크) MVP. 2026-11-26에 formula1.com·motorsport.com RSS가 HTTP 200 응답(파싱은 미확인). 기존 `NewsSection`은 디자인·조회 방식 때문에 재사용 비추천. 서버에서 `getNews()` 호출, `revalidate` 설정, `Promise.allSettled`, 실패해도 홈은 표시. 착수 여부는 미정
- 남은 큰 작업 3개: ① 결과 페이지 분리(완료) + 새 홈(f1-boxbox 홈 구성은 구조만 참고, 에셋 복사 안 함) ② 뉴스 페이지 ③ 게시판(백엔드 필요, 방향 미정). 순서는 ① → ② → ③
- 시즌 전체 카드의 추가 디자인(라운드 번호·상태 칩·스프린트 표시·날짜 범위 `formatKstDateRange`)은 보류

**결정 사항**
- AI 기능은 기능 추가·모바일 확인 뒤 고도화 단계로 미룬다
- 홈 성능 개선은 1차에서 멈췄다(`RaceResults`, `UpcomingRaceLink`의 서버 전환은 보류)
- `RaceResults` 서버 전환은 탭별 포디움에 필수가 아니라 따로 한다. 전환할 때 함께 고칠 것: 연습 주행의 모듈 변수 캐시 `weekendPromise`(→ React `cache()`), OpenF1 `fetch`의 `revalidate` 지정, "세션 없음"과 "조회 실패" 구분. 전환 전후 측정 필요
- 오콘은 시즌 이탈, 카마라(#51)가 자리를 이어받는다. 번호 `31` 매핑은 의도적으로 `51`로 교체됨. 히라카와(#50)는 임시 출전이라 매핑하지 않는다
- 이미지는 라이선스가 명확한 출처(위키미디어 CC 계열) 또는 직접 생성만 쓴다
- 프로젝트 이름(탭 제목 `app/layout.tsx`, 네비 로고 alt, `package.json` name)은 임시다. 나중에 정하고 한 번에 바꾼다

**알려진 빈 곳·미확인**
- OpenF1 데이터의 이용 조건 미확인
- 국기 13개, 드라이버 이미지(린드블라드 #41 등), 크기 과다 이미지(포디움 PNG 최대 2.4MB)
- 현재 `assets/`의 드라이버·차량·포디움 이미지의 출처 미확인
- 정적 페이지에서 재생성 실패 시 이전 페이지가 유지되는지는 배포 환경에서 확인 필요
- `RaceResults`·`UpcomingRaceLink`는 여전히 브라우저에서 외부 API를 직접 호출
- `NextNextRace`는 다음 레이스가 아니라 그다음 라운드를 보여준다(서킷 이름·D-day가 그 라운드 기준). 의도 확인 필요
- README 폴더 구조에 `schedulePage` 없음
- 푸터의 "데이터 출처" 문구가 실제 출처(Jolpica, OpenF1)와 다름. Jolpica·OpenF1 이용 조건은 미확인이라 출처 이름만 적을 예정
- 시즌이 끝나면(12/6 이후) 다음 레이스가 없음 → 홈의 다음 레이스 자리에 "시즌 종료" 처리가 필요
- 새 디자인은 실제 폰·390px 폭에서 확인 못 함(헤드리스 크롬 최소 폭 500px). 결과 탭(프렉티스·퀄리파이·스프린트), 취소·챔피언 시즌 포디움 대체 화면도 못 봄
- `/result`는 레이스 탭만 캡처로 확인(1600px, 500px). 다른 탭 전환과 분리 후 "더 보기"·홈 화면은 직접 확인 못 함. 500px에서 P3 이름이 단어 중간에서 줄바꿈됨
- `PodiumStage` 로딩 상태에서 `EmptyOrLoading`을 `mobile` 없이 써서 표 밖에 `<tr>`이 렌더링됨(코드 확인, 수정 필요)
- `RacingTypeTabMenu`에서 React `key` 경고 발생(2026-11-26 개발 서버 로그, 이후 수정 여부 미확인)
- 연습 주행 포디움은 합친 표의 순서(FP1 우선)를 따른다. `getDriverImageUrl`에 없는 번호는 포디움 이미지가 비고, 포디움 이름·팀명은 한글
- 뉴스 RSS 이용 조건 미확인
- ESLint 설정이 없어 `npm run lint`는 설정 질문만 뜨고 실행되지 않음
- 2026-11-26 작업 후 `tsc --noEmit`은 통과. `next build`와 배포 상태는 확인 안 함
- 포디움 PNG, `Abu_Dhabi.jpg`(6.7MB)는 사용자가 webp로 변환할 예정

**작업 환경 주의**
- 개발 서버(`next dev`)와 `next build`가 같은 `.next`를 써서 서로를 망가뜨린다. 개발 서버가 떠 있으면 별도 `git worktree`에서 빌드·측정한다
- 사용자가 직접 수정 중인 미커밋 파일이 있을 수 있다. 커밋은 내가 만든 파일만 경로를 지정해서 한다

## 작업 규칙

1. **코드를 쓰기 전에 설계를 먼저 설명하고 사용자의 확인을 받기.** 선택지가 있으면 장단점과 함께 제시하기.
2. **사용자가 이해할 수 있게 진행하기.** 왜 그렇게 하는지 짧게 설명하고, 사용자가 직접 써보고 싶어 하면 힌트만 주기.
3. **작은 단위로 작업하고 커밋하기.** 커밋 메시지는 기존 형식(`feat :`, `fix :`, `chore :` + 한국어 설명)을 따르기.
4. **성능 수치는 측정한 값만 기록하기.** 추정치를 수치로 쓰지 않기. 측정 조건(빌드 모드, 캐시 상태, 반복 횟수)도 같이 남기기. 기록 위치: `docs/perf-baseline.md`
5. **계획에 없는 큰 변경(Next.js 버전 업그레이드, 라이브러리 교체 등)은 먼저 제안만 하고 사용자 결정을 기다리기.**
6. API 키나 비밀 값은 절대 커밋하지 않기 (`.env.local` 사용).

## 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (페이지별 First Load JS 확인)
npm run start    # 프로덕션 서버 (Lighthouse 측정은 이걸로)
npm run lint
```
