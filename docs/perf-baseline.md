# 성능 측정 기록

## baseline (2026-11-19)

### 측정 조건
- 날짜: 2026-11-19
- 커밋: `0475ec0`
- 작업 트리 변경: 없음 (`git status --short` 출력 없음)
- 빌드 모드: 프로덕션 (`npm run build` + `npm run start`, 포트 3000)
- 캐시 상태: cold = `.next/cache/fetch-cache` 삭제 후 서버 새로 기동 / warm = cold 직후 연속 5회
- 반복 횟수: TTFB warm 5회, Lighthouse 3회
- OS: macOS (Darwin 25.6.0, arm64), Node v26.13.1, Lighthouse 13.6.0 (npx), headless Chrome

### 빌드 크기

| Route | Size | First Load JS |
|---|---|---|
| / | 11 kB | 125 kB |
| /_not-found | 879 B | 88.2 kB |
| /api/news | 0 B | 0 B |
| /board | 144 B | 87.5 kB |
| /driverChart (동적) | 102 kB | 208 kB |
| /drivers (동적) | 8.78 kB | 101 kB |
| /news | 144 B | 87.5 kB |
| /schedule | 6.7 kB | 113 kB |
| /standings | 4.15 kB | 105 kB |
| First Load JS shared by all | | 87.3 kB |

공유 청크: `chunks/23-cae80e2eabb7837f.js` 31.7 kB, `chunks/fd9d1056-bb5162144b665c21.js` 53.7 kB, other shared chunks 2 kB.

### TTFB (초, `time_starttransfer`)

| 경로 | cold (첫 요청) | warm min | warm median | warm max |
|---|---|---|---|---|
| / | 0.047 | 0.002 | 0.002 | 0.004 |
| /driverChart | 0.039 | 0.013 | 0.016 | 0.017 |

warm 개별 값: `/` = 0.004, 0.002, 0.002, 0.002, 0.002 / `/driverChart` = 0.013, 0.017, 0.016, 0.017, 0.015 (측정 순서, 소수 4째 자리 이하 반올림). 모든 응답 HTTP 200.

### Lighthouse (`/`, Performance 카테고리, 3회)

| 실행 | Performance | FCP (ms) | LCP (ms) | TBT (ms) | CLS | Speed Index (ms) |
|---|---|---|---|---|---|---|
| 1 | 50 | 765 | 9690 | 1334 | 0.0000 | 2689 |
| 2 | 87 | 758 | 4038 | 32 | 0.0149 | 1021 |
| 3 | 76 | 757 | 7657 | 34 | 0.0148 | 1080 |
| 중앙값 | 76 | 758 | 7657 | 34 | 0.0148 | 1080 |

### 주석
- 외부 API(OpenF1, Jolpica) 응답 시간에 따라 cold 값이 흔들릴 수 있다.
- cold 측정 중 서버 로그에 Jolpica `429` 오류(`/driverChart`의 라운드별 results 요청, 로그상 60건)가 기록되었다. `/driverChart` cold TTFB는 레이트 리밋으로 요청이 실패한 상태의 값이며 정상 데이터 로딩 시간이 아니다. 페이지 응답은 HTTP 200이었다.
- Lighthouse 3회 간 편차가 크다 (Performance 50~87, LCP 4038~9690 ms, TBT 32~1334 ms). 중앙값은 참고용으로만 사용할 것.
- `npm run build` 중 `sharp` 미설치 경고가 출력되었다 (이미지 최적화 관련).
- 측정 시작 시 포트 3000에서 이 프로젝트의 기존 `next-server`(PID 94715)가 실행 중이어서 종료한 뒤 측정했다.
- 측정 실패 항목: 없음.

## baseline 보강 (2026-11-20)

> 이전 baseline(2026-11-19)과 직접 비교하지 않는다. 커밋(`0475ec0` → `2de5263`), 작업 트리 상태(변경 없음 → `app/(site)/page.tsx` 수정됨), Lighthouse 반복 횟수(3회 → 5회)가 다르고, 이번에는 LCP 요소·외부 API 요청·formFactor를 추가로 기록했다. 빌드 결과에서 `/drivers` 라우트가 사라진 것도 커밋 차이에 따른 것이다.

### 측정 조건
- 날짜: 2026-11-20
- 커밋: `2de5263`
- 작업 트리 변경: 측정 당시 `app/(site)/page.tsx`의 미커밋 수정(최상단 `"use client"`와 `NewsSection` import 제거, 7줄)이 포함되어 있었다. 이 수정은 이후 커밋 `08cab79`에 그대로 들어갔고(변경 통계가 같다), 따라서 **이 측정값은 커밋 `08cab79` 상태의 값으로 본다.** 하위 섹션(`PodiumNew`, `RaceResults`, `UpcomingRaceLink`)은 여전히 `"use client"`이다. 서버 컴포넌트 전환 작업의 출발점은 이 상태다. 순수한 개선 전 상태는 이전 baseline(`0475ec0`)이다.
- 빌드 모드: 프로덕션 (`npm run build` + `npx next start -p 3100`). 포트 3000에 기존 `next-server`(PID 14782, 이 프로젝트 디렉터리)가 떠 있어 종료하지 않고 3100으로 측정했다.
- 캐시 상태: cold = `.next/cache/fetch-cache` 삭제 후 서버 새로 기동 / warm = cold 직후 연속 5회
- 반복 횟수: TTFB warm 5회, Lighthouse 5회
- OS: macOS 26.7.3 (Darwin 25.6.0), Node v26.13.1, Lighthouse 13.6.0 (npx), HeadlessChrome/157.0.0.0
- Lighthouse 설정: `formFactor` = mobile (기본값), throttlingMethod = simulate, rttMs 150, throughputKbps 1638.4, requestLatencyMs 562.5, downloadThroughputKbps 1474.56, uploadThroughputKbps 675, cpuSlowdownMultiplier 4. 실행 중 runWarnings 없음.

### 빌드 크기

| Route | Size | First Load JS |
|---|---|---|
| / | 11 kB | 122 kB |
| /_not-found | 879 B | 88.2 kB |
| /api/news | 0 B | 0 B |
| /board | 144 B | 87.5 kB |
| /driverChart (동적) | 102 kB | 206 kB |
| /news | 144 B | 87.5 kB |
| /schedule | 6.67 kB | 110 kB |
| /standings | 4.13 kB | 103 kB |
| First Load JS shared by all | | 87.3 kB |

공유 청크: `chunks/23-cae80e2eabb7837f.js` 31.7 kB, `chunks/fd9d1056-bb5162144b665c21.js` 53.7 kB, other shared chunks 2 kB. `/`는 정적(prerendered), `/driverChart`는 동적(server-rendered on demand).

### TTFB (초, `time_starttransfer`, 포트 3100)

| 경로 | cold (첫 요청) | warm min | warm median | warm max |
|---|---|---|---|---|
| / | 0.005 | 0.002 | 0.002 | 0.003 |
| /driverChart | 0.053 | 0.013 | 0.014 | 0.017 |

warm 개별 값(측정 순서, 원값 소수 6자리): `/` = 0.003456, 0.002067, 0.001832, 0.001536, 0.001574 / `/driverChart` = 0.012887, 0.012781, 0.014134, 0.016026, 0.016764. cold 원값: `/` 0.005057, `/driverChart` 0.052609. 모든 응답 HTTP 200. 표의 값은 소수 3자리 반올림이며 `/` warm min은 0.001536 → 0.002다.

### Lighthouse (`/`, Performance 카테고리, mobile, 5회)

| 실행 | Performance | FCP (ms) | LCP (ms) | TBT (ms) | CLS | Speed Index (ms) |
|---|---|---|---|---|---|---|
| 1 | 86 | 757 | 4162 | 26 | 0.0152 | 1131 |
| 2 | 89 | 756 | 3832 | 11 | 0.0148 | 1001 |
| 3 | 85 | 756 | 4352 | 0 | 0.0153 | 1448 |
| 4 | 87 | 756 | 4011 | 10 | 0.0000 | 1052 |
| 5 | 76 | 756 | 7506 | 28 | 0.0146 | 1034 |
| 중앙값 | 86 | 756 | 4162 | 11 | 0.0148 | 1052 |

ms 값은 정수 반올림. 실행 1~5는 서버 기동 후 TTFB 측정을 마친 뒤 이어서 순차 실행했다.

#### LCP 요소
- 5회 모두 동일: `<img alt="Lando Norris" loading="lazy" ... src="/_next/static/media/Norris_Podium.b81abbb6.png">` (선택자 `div.absolute > div.relative > div.relative > img.object-cover`, 이미지 크기 210x280).
- 이 이미지는 `loading="lazy"`로 렌더링되었다.
- 참고: Lighthouse 13.6.0에는 `largest-contentful-paint-element` audit이 없어, 같은 정보를 담은 `lcp-breakdown-insight` audit에서 읽었다.
- LCP 세부 구간(ms, 실행 1~5): TTFB 4 / 4 / 4 / 4 / 4, resource load delay 602 / 437 / 934 / 546 / 455, resource load duration 9 / 11 / 11 / 8 / 9, element render delay 19 / 35 / 26 / 23 / 31.

#### 네트워크 요청 (`network-requests` audit)
- 전체 요청 수: 5회 모두 44건 (`localhost:3100` 36건, `api.jolpi.ca` 6건, `api.openf1.org` 2건).
- 외부 API 요청은 모두 브라우저(resourceType `Fetch`)가 보낸 것이다. 소요 시간 = networkEndTime - networkRequestTime(ms).

| 실행 | api.jolpi.ca 요청 수 | api.jolpi.ca 소요 시간 (ms, 요청 순서) | api.openf1.org 요청 수 | api.openf1.org 소요 시간 (ms) |
|---|---|---|---|---|
| 1 | 6 | 851.4, 522.6, 522.7, 522.5, 849.3, 513.3 | 2 | 999.7, 306.2 |
| 2 | 6 | 359.0, 348.3, 348.1, 347.8, 327.6, 332.6 | 2 | 955.3, 370.9 |
| 3 | 6 | 541.4, 846.0, 846.5, 846.9, 845.1, 860.1 | 2 | 994.4, 312.1 |
| 4 | 6 | 431.5, 459.0, 459.0, 458.7, 430.5, 478.3 | 2 | 978.5, 303.7 |
| 5 | 6 | 348.2, 347.6, 347.6, 347.7, 359.1, 346.2 | 2 | 947.4, 303.1 |

- jolpi.ca 요청 6건(전 실행 동일): `/ergast/f1/current/next.json` 1, `/ergast/f1/current/last/results.json` 3, `/ergast/f1/current/last/sprint.json` 1, `/ergast/f1/current/last/qualifying.json` 1. 모두 HTTP 200.
- openf1.org 요청 2건(전 실행 동일): `https://api.openf1.org/v1/sessions?year=2026` 2회. 두 건 모두 `statusCode`가 -1로 기록되어 응답 상태를 확인하지 못했다 (원인 미확인).

### 주석
- 외부 API(OpenF1, Jolpica) 응답 시간에 따라 cold 값이 흔들릴 수 있다.
- `/`는 빌드 시 정적 생성(○)이라 서버 TTFB에 외부 API 대기가 포함되지 않는다. 대신 위 표처럼 브라우저가 페이지 로드 중 외부 API를 직접 호출한다.
- `/driverChart` cold/warm 측정 중 서버 로그에 Jolpica `429`(`Error fetching round N results`)가 기록되었다. Lighthouse 실행 전 시점에 `Error fetching round` 로그 84건, `429` 포함 줄 90건 (줄 수와 건수가 다른 이유는 확인하지 않음). 요청이 실패한 상태의 값이므로 `/driverChart` TTFB는 정상 데이터 로딩 시간이 아니다. 응답은 HTTP 200이었다.
- Lighthouse 5회 간 편차가 있다 (Performance 76~89, LCP 3832~7506 ms). 실행 5의 LCP 7506 ms가 두드러진 이상값이며 원인은 확인하지 않았다. 실행 4의 CLS 0은 다른 실행(약 0.015)과 다르다.
- 측정 중 `npm run build`의 `.next` 갱신과 `fetch-cache` 삭제를 포트 3000의 기존 서버가 쓰는 같은 디렉터리에서 수행했다. 측정을 마친 시점에 포트 3000 서버가 더 이상 리스닝하지 않는 것을 확인했다 (종료 시점·원인은 확인하지 못함).
- 측정 실패 항목: 없음. 단 `largest-contentful-paint-element` audit은 Lighthouse 13.6.0에 없어 `lcp-breakdown-insight`로 대체했고, openf1 요청의 상태 코드는 -1로 확인되지 않았다.

## after: 홈 개선 1차 (2026-11-20)

> 비교 대상은 직전 `baseline 보강` 섹션(커밋 `08cab79` 상태)이다. 측정 방식(Lighthouse 5회, mobile, simulate throttling, 포트 3100, cold/warm 절차)은 같게 맞췄다. 이전 baseline(2026-11-19, `0475ec0`, 3회)과는 직접 비교하지 않는다.

### 측정 조건
- 날짜: 2026-11-20
- 커밋: `ec9e34f` (PodiumNew 서버 컴포넌트 전환 `b24ba0a` + 첫 카드 이미지 priority 적용 `ec9e34f` 포함)
- 작업 트리 변경: 없음 (`git status --short` 출력이 비어 있었고, 측정 후에도 비어 있음)
- 빌드 모드: 프로덕션 (`npm run build` + `npx next start -p 3100`). 포트 3000에 기존 `next-server`(PID 48547, 이 프로젝트 디렉터리가 cwd)가 떠 있어 종료하지 않고 3100으로 측정했다. 측정 후에도 포트 3000 서버는 그대로 리스닝 중이다.
- 캐시 상태: cold = `.next/cache/fetch-cache` 삭제 후 서버 새로 기동 / warm = cold 직후 연속 5회
- 반복 횟수: TTFB warm 5회, Lighthouse 5회
- OS: macOS (Darwin 25.6.0, arm64), Node v26.13.1, Lighthouse 13.6.0 (npx)
- Lighthouse 설정: `formFactor` = mobile (기본값), throttlingMethod = simulate (기본값, 별도 지정 없음). 5회 모두 runWarnings 없음.

### 빌드 크기

| Route | Size | First Load JS |
|---|---|---|
| / | 10.5 kB | 121 kB |
| /_not-found | 879 B | 88.2 kB |
| /api/news | 0 B | 0 B |
| /board | 144 B | 87.5 kB |
| /driverChart (동적) | 102 kB | 205 kB |
| /news | 144 B | 87.5 kB |
| /schedule | 6.67 kB | 110 kB |
| /standings | 4.13 kB | 102 kB |
| First Load JS shared by all | | 87.3 kB |

공유 청크: `chunks/23-cae80e2eabb7837f.js` 31.7 kB, `chunks/fd9d1056-bb5162144b665c21.js` 53.7 kB, other shared chunks 2 kB. `/`는 정적(○), `/driverChart`는 동적(ƒ).

### TTFB (초, `time_starttransfer`, 포트 3100)

| 경로 | cold (첫 요청) | warm min | warm median | warm max |
|---|---|---|---|---|
| / | 0.006 | 0.002 | 0.002 | 0.004 |
| /driverChart | 0.049 | 0.011 | 0.016 | 0.017 |

원값(소수 6자리): cold `/` 0.005843, `/driverChart` 0.049041. warm 개별 값(측정 순서): `/` = 0.004215, 0.002347, 0.002015, 0.001903, 0.001634 / `/driverChart` = 0.011266, 0.015900, 0.012628, 0.016770, 0.017327. 모든 응답 HTTP 200. 표의 값은 소수 3자리 반올림.

### Lighthouse (`/`, Performance 카테고리, mobile, 5회)

| 실행 | Performance | FCP (ms) | LCP (ms) | TBT (ms) | CLS | Speed Index (ms) |
|---|---|---|---|---|---|---|
| 1 | 76 | 757 | 7432 | 0 | 0.0004 | 1050 |
| 2 | 76 | 756 | 7506 | 0 | 0.0000 | 964 |
| 3 | 76 | 756 | 7506 | 34 | 0.0000 | 970 |
| 4 | 76 | 756 | 7656 | 0 | 0.0000 | 1038 |
| 5 | 76 | 756 | 7506 | 25 | 0.0000 | 982 |
| 중앙값 | 76 | 756 | 7506 | 0 | 0.0000 | 982 |

ms 값은 정수 반올림. 5회 모두 Performance 76으로 같고 LCP도 7432~7656 ms 범위에 몰려 있어 실행 간 편차는 작다. 이번 세트에는 이전 섹션 실행 5(LCP 7506 ms)처럼 혼자 튀는 이상값은 없다. 다만 5회 모두의 LCP(약 7.4~7.7초)가 이전 섹션 중앙값(4162 ms)보다 높고, 이전 섹션의 정상 범위(3832~4352 ms)를 벗어난다. 이는 이상값이 아니라 이번 세트 전체의 수준이다. 원인은 확인하지 않았다.

#### LCP 요소
- 5회 모두 동일: `<img alt="Norris" fetchpriority="high" decoding="async" data-nimg="fill" ... src="/_next/static/media/Norris_Podium.b81abbb6.png">` (선택자 `div.absolute > div.relative > div.relative > img.object-cover`, 크기 210x280).
- `loading` 속성 없음 (`loading="lazy"` 아님), `fetchpriority="high"`.
- 읽은 audit: `lcp-breakdown-insight` (`largest-contentful-paint-element` audit은 Lighthouse 13.6.0에 없음).
- LCP 세부 구간(ms, 실행 1~5): TTFB 4.4 / 4.0 / 4.7 / 4.2 / 4.2, resource load delay 35.0 / 5.6 / 23.8 / 32.6 / 16.8, resource load duration 17.9 / 10.7 / 9.5 / 8.5 / 11.4, element render delay 447.3 / 586.9 / 472.7 / 883.1 / 426.9. 이 구간 합계(약 0.5~0.9초)는 보고된 LCP 값(약 7.4~7.7초)과 크게 다르다. 둘이 왜 다른지는 확인하지 않았다.

#### 네트워크 요청 (`network-requests` audit)
- 전체 요청 수: 실행 1 = 33건, 실행 2~5 = 43건 (중앙값 43). 호스트별: 실행 1 `localhost:3100` 26 / `api.jolpi.ca` 4 / `api.openf1.org` 3, 실행 2~5 `localhost:3100` 36 / `api.jolpi.ca` 4 / `api.openf1.org` 3. 실행 1이 localhost 요청 10건 적은 이유는 확인하지 않았다.
- 외부 API 요청은 모두 resourceType `Fetch`. 소요 시간 = networkEndTime - networkRequestTime(ms).

| 실행 | api.jolpi.ca 요청 수 | api.jolpi.ca 소요 시간 (ms, 요청 순서) | api.openf1.org 요청 수 | api.openf1.org 소요 시간 (ms) |
|---|---|---|---|---|
| 1 | 4 | 369.2, 365.3, 359.3, 366.4 | 3 | 1133.8, 341.1, 340.0 |
| 2 | 4 | 496.9, 742.3, 822.1, 493.3 | 3 | 1057.2, 318.5, 312.3 |
| 3 | 4 | 378.2, 435.4, 374.1, 372.6 | 3 | 1041.5, 348.8, 321.1 |
| 4 | 4 | 805.4, 755.1, 761.6, 808.6 | 3 | 1060.9, 320.2, 306.6 |
| 5 | 4 | 338.3, 349.1, 358.9, 349.8 | 3 | 972.3, 334.6, 311.2 |

- jolpi.ca 요청 4건(전 실행 동일): `/ergast/f1/current/next.json` 1, `/ergast/f1/current/last/results.json` 1, `/ergast/f1/current/last/sprint.json` 1, `/ergast/f1/current/last/qualifying.json` 1. 상태 코드: 실행 2~5는 모두 200, 실행 1은 4건 모두 -1(확인 못 함).
- openf1.org 요청 3건(전 실행 동일): `/v1/sessions?year=2026` 1, `/v1/session_result?meeting_key=1299` 1, `/v1/drivers?session_key=11405` 1. 상태 코드 5회 모두 200.

### 서버 로그 429
- 서버 로그(`npx next start -p 3100`의 stdout/stderr)에 Jolpica 429가 있었다. cold/warm TTFB 측정(`/driverChart` 요청) 중에 기록되었고, 전체 측정(Lighthouse 5회 포함) 종료 후 `429` 포함 줄 54건, `Error fetching round` 줄 48건이다 (줄 수와 건수가 다른 이유는 확인하지 않음). `/driverChart`가 요청마다 24라운드를 호출하는 알려진 문제와 연결되는지는 확인하지 않았다. 요청이 실패한 상태의 값이므로 `/driverChart` TTFB는 정상 데이터 로딩 시간이 아니다. 응답은 HTTP 200이었다.
- 이전 섹션 기록(Lighthouse 실행 전 시점 기준 429 포함 줄 90건, `Error fetching round` 84건)과는 로그 집계 시점이 달라 직접 비교하지 않는다.

### 주석
- 외부 API(OpenF1, Jolpica) 응답 시간에 따라 cold 값이 흔들릴 수 있다.
- `/`는 빌드 시 정적 생성(○)이라 서버 TTFB에 외부 API 대기가 포함되지 않는다. 대신 브라우저가 페이지 로드 중 외부 API를 직접 호출한다.
- 이번 빌드(`npm run build`)는 포트 3000의 기존 서버(PID 48547)가 쓰는 같은 `.next` 디렉터리를 덮어썼다. 3000 서버에는 영향을 확인하지 않았고, 종료하지도 않았다.
- 측정 실패 항목: 없음. 단 `largest-contentful-paint-element` audit은 없어 `lcp-breakdown-insight`로 대체했고, Lighthouse 실행 1의 jolpi 요청 상태 코드는 -1로 확인되지 않았다.

## 08cab79 대비 (baseline 보강 → after 홈 개선 1차)

비교 대상: `baseline 보강`(커밋 `08cab79` 상태) vs `after`(커밋 `ec9e34f`). 둘 다 Lighthouse 5회, mobile, simulate, 포트 3100. 변화율 = (after - 이전) / 이전, 표에 적힌 두 측정값에서 계산했다. Lighthouse 값은 정수 반올림된 중앙값 기준이다.

### Lighthouse (중앙값)

| 지표 | 08cab79 | ec9e34f | 변화 |
|---|---|---|---|
| Performance | 86 | 76 | -10점 (-11.6%) |
| FCP (ms) | 756 | 756 | 0.0% |
| LCP (ms) | 4162 | 7506 | +80.3% |
| TBT (ms) | 11 | 0 | -100.0% |
| CLS | 0.0148 | 0.0000 | -100.0% |
| Speed Index (ms) | 1052 | 982 | -6.7% |

- 이전 섹션 개별 값 범위: Performance 76~89, LCP 3832~7506 ms (실행 5가 이상값 7506). 이번 개별 값 범위: Performance 76 (전부), LCP 7432~7656 ms. 이번 5회 LCP는 전부 이전 섹션의 이상값(실행 5) 수준이다. 따라서 이전 중앙값(4162)과의 +80.3%는 중앙값끼리의 계산일 뿐이고, 이전 섹션에서 정상 범위였던 3832~4352 ms와 비교해도 모든 실행이 더 높다.
- TBT와 CLS는 이전·이번 모두 0에 가까운 값이라 변화율이 크게 나오지만 절대값 차이는 작다 (TBT 이번 개별 값 0/0/0/25/34, 이전 26/11/0/10/28).
- LCP 요소: 이전 `<img alt="Lando Norris" loading="lazy">` → 이번 `<img alt="Norris" fetchpriority="high">` (`loading` 속성 없음). 같은 이미지 파일(`Norris_Podium.b81abbb6.png`).

### 네트워크 요청 (브라우저가 보낸 요청)

| 항목 | 08cab79 | ec9e34f | 변화 |
|---|---|---|---|
| 전체 요청 수 (중앙값) | 44 | 43 | -2.3% |
| localhost:3100 | 36 | 36 (실행 1은 26) | 0.0% (중앙값 기준) |
| api.jolpi.ca | 6 | 4 | -33.3% |
| api.openf1.org | 2 | 3 | +50.0% |

- 이전은 5회 모두 44건이었고, 이번은 실행 1만 33건, 실행 2~5는 43건이다.
- jolpi `results.json`이 3건 → 1건으로 줄었고, openf1은 `/v1/sessions?year=2026` 2건 → 1건, 그리고 `/v1/session_result`, `/v1/drivers` 각 1건이 새로 보인다.

### 빌드 크기 (First Load JS)

| Route | 08cab79 | ec9e34f | 변화 |
|---|---|---|---|
| / | 122 kB (Size 11 kB) | 121 kB (Size 10.5 kB) | -0.8% (Size -4.5%) |
| /driverChart | 206 kB | 205 kB | -0.5% |
| /standings | 103 kB | 102 kB | -1.0% |
| /schedule | 110 kB | 110 kB | 0.0% |
| shared by all | 87.3 kB | 87.3 kB | 0.0% |

kB는 빌드 출력의 표시값(반올림)이라 1 kB 차이의 변화율은 오차가 크다.

### TTFB (원값 기준, 초)

| 경로 | 지표 | 08cab79 | ec9e34f | 변화 |
|---|---|---|---|---|
| / | cold | 0.005057 | 0.005843 | +15.5% |
| / | warm median | 0.001832 | 0.002015 | +10.0% |
| /driverChart | cold | 0.052609 | 0.049041 | -6.8% |
| /driverChart | warm median | 0.014134 | 0.015900 | +12.5% |

TTFB는 밀리초 단위의 차이이고, `/driverChart`는 양쪽 모두 Jolpica 429가 섞인 값이라 개선·악화의 근거로 쓰지 않는다.

## after 재측정: 재현 확인 (2026-11-20)

> 목적: 직전 `after: 홈 개선 1차` 섹션에서 LCP가 7506 ms(5회 7432~7656 ms, Performance 76)로 나왔고 원인을 몰라서, 같은 커밋 `ec9e34f`를 같은 조건으로 다시 측정해 재현되는지 확인한다. 소스 변경 없이 같은 커밋을 다시 빌드·측정했다.

### 측정 조건
- 날짜: 2026-11-20 (11:41~11:43 KST 부근)
- 커밋: `ec9e34f`
- 작업 트리 변경: 측정 전 `git status --short` = ` M docs/perf-baseline.md` 한 줄(이 문서 자체의 미커밋 수정, 직전 섹션들이 아직 커밋되지 않은 상태). 소스·설정 파일 변경은 없었다. 측정 후에도 같은 한 줄.
- 서버 상태(측정 전): 포트 3000, 3100 모두 리스닝 프로세스 없음. `next`/`node` 프로세스는 Cursor 편집기 확장 헬퍼(language server 등)뿐이고 `next-server`는 없었다. 직전 섹션과 달리 포트 3000 서버가 없는 상태에서 측정했다.
- 빌드 모드: 프로덕션 (`npm run build` + `npx next start -p 3100`)
- 캐시 상태: cold = `.next/cache/fetch-cache` 삭제 후 서버 새로 기동 / warm = cold 직후 연속 5회
- 반복 횟수: TTFB warm 5회, Lighthouse 5회
- OS: macOS 26.7.3 (Darwin 25.6.0, arm64), Node v26.13.1, Lighthouse 13.6.0 (npx), 헤드리스 Chrome
- Lighthouse 설정: `formFactor` = mobile (기본값), throttlingMethod = simulate, rttMs 150, throughputKbps 1638.4, requestLatencyMs 562.5, downloadThroughputKbps 1474.56, uploadThroughputKbps 675, cpuSlowdownMultiplier 4. 5회 모두 runWarnings 없음.

### 측정 환경 부하
- 사용자의 Chrome(`Google Chrome Helper`, PID 1246/1274)과 Cursor, Claude 앱이 측정 중 함께 실행 중이었다.

| 시점 | uptime load average (1/5/15분) | CPU 상위 프로세스 (%CPU) |
|---|---|---|
| 사전 확인 | 2.77 / 2.60 / 2.56 | Cursor Helper (Renderer) 111.7, Chrome Helper (Aperitif Renderer) 39.7, WindowServer 37.6, Cursor Helper (Renderer) 14.9, Cursor 11.0 |
| 빌드 직전 | 2.72 / 2.60 / 2.55 | WindowServer 29.9, Cursor Helper (Renderer) 22.0, Chrome Helper (Aperitif) 16.7, Chrome Helper (Aperitif Renderer) 16.5, Cursor Helper (Renderer) 9.9 |
| Lighthouse 실행 1 직전 | 3.06 / 2.69 / 2.59 | 미기록 |
| Lighthouse 실행 2 직전 | 3.42 / 2.78 / 2.62 | 미기록 |
| Lighthouse 실행 3 직전 | 3.32 / 2.79 / 2.63 | 미기록 |
| Lighthouse 실행 4 직전 | 3.59 / 2.86 / 2.65 | 미기록 |
| Lighthouse 실행 5 직전 | 3.09 / 2.79 / 2.63 | 미기록 |
| 측정 종료 후 | 2.71 / 2.72 / 2.61 | WindowServer 17.5, Cursor 5.5, Claude 4.9, Cursor Helper (Renderer) 4.0, Cursor Helper (Renderer) 3.0 |

CPU 상위 프로세스는 `ps -Ao pid,%cpu,comm -r | head`의 1회 순간값이다. 이 머신의 코어 수는 확인하지 않았다. 직전 after 측정 시점의 부하는 기록이 없어 비교할 수 없다.

### 빌드 크기

| Route | Size | First Load JS |
|---|---|---|
| / | 10.5 kB | 121 kB |
| /_not-found | 879 B | 88.2 kB |
| /api/news | 0 B | 0 B |
| /board | 144 B | 87.5 kB |
| /driverChart (동적) | 102 kB | 205 kB |
| /news | 144 B | 87.5 kB |
| /schedule | 6.67 kB | 110 kB |
| /standings | 4.13 kB | 102 kB |
| First Load JS shared by all | | 87.3 kB |

공유 청크: `chunks/23-cae80e2eabb7837f.js` 31.7 kB, `chunks/fd9d1056-bb5162144b665c21.js` 53.7 kB, other shared chunks 2 kB. 직전 after 섹션과 모든 값이 같다.

### TTFB (초, `time_starttransfer`, 포트 3100)

| 경로 | cold (첫 요청) | warm min | warm median | warm max |
|---|---|---|---|---|
| / | 0.066 | 0.002 | 0.002 | 0.003 |
| /driverChart | 0.047 | 0.010 | 0.011 | 0.012 |

원값(소수 6자리): cold `/` 0.065992, `/driverChart` 0.047496. warm 개별 값(측정 순서): `/` = 0.003002, 0.002361, 0.002058, 0.001666, 0.001675 / `/driverChart` = 0.012206, 0.010986, 0.011035, 0.009827, 0.010762. 모든 응답 HTTP 200. 표의 값은 소수 3자리 반올림. cold `/` 값(0.066)은 직전 after(0.006)보다 크다. 원인은 확인하지 않았다.

### Lighthouse (`/`, Performance 카테고리, mobile, 5회)

| 실행 | Performance | FCP (ms) | LCP (ms) | TBT (ms) | CLS | Speed Index (ms) |
|---|---|---|---|---|---|---|
| 1 | 76 | 759 | 7509 | 24 | 0.0000 | 997 |
| 2 | 76 | 756 | 7506 | 33 | 0.0000 | 973 |
| 3 | 76 | 756 | 7581 | 14 | 0.0000 | 969 |
| 4 | 76 | 755 | 7655 | 0 | 0.0000 | 1017 |
| 5 | 76 | 756 | 7581 | 33 | 0.0000 | 999 |
| 중앙값 | 76 | 756 | 7581 | 24 | 0.0000 | 997 |

ms 값은 정수 반올림. 실행 1~5는 TTFB 측정 직후 순차 실행했다.

#### LCP 요소
- 5회 모두 동일: `<img alt="Norris" fetchpriority="high" decoding="async" data-nimg="fill" ... src="/_next/static/media/Norris_Podium.b81abbb6.png">` (선택자 `div.absolute > div.relative > div.relative > img.object-cover`, boundingRect 210x280).
- `loading` 속성 없음 (`loading="lazy"` 아님), `fetchpriority="high"`.
- 읽은 audit: `lcp-breakdown-insight` (`largest-contentful-paint-element` audit은 Lighthouse 13.6.0에 없음).

#### LCP 값과 구간별 값 (`lcp-breakdown-insight`, ms)

| 실행 | LCP (numericValue) | TTFB | resource load delay | resource load duration | element render delay | 구간 합계 | LCP - 합계 |
|---|---|---|---|---|---|---|---|
| 1 | 7508.7 | 3.9 | 20.4 | 19.2 | 435.2 | 478.7 | 7030.0 |
| 2 | 7506.4 | 4.2 | 5.5 | 9.9 | 460.8 | 480.5 | 7025.9 |
| 3 | 7581.2 | 4.6 | 24.5 | 9.9 | 620.0 | 659.0 | 6922.2 |
| 4 | 7655.4 | 4.7 | 26.9 | 11.5 | 871.7 | 914.8 | 6740.6 |
| 5 | 7581.0 | 4.2 | 33.4 | 9.1 | 512.9 | 559.6 | 7021.4 |

사실: 5회 모두 구간 합계(약 0.48~0.91초)가 LCP 값(약 7.51~7.66초)보다 6.7~7.0초 작다. 즉 LCP 값과 구간 합계가 크게 다르다. 이 차이가 어디서 생기는지는 이번 측정으로 확인하지 않았다.

#### LCP 이미지 요청 (`network-requests`, `Norris_Podium.b81abbb6.png`)

시작 시각은 `networkRequestTime`(ms, 페이지 로드 시작 기준), 소요 시간은 `networkEndTime - networkRequestTime`.

| 실행 | 시작 시각 (ms) | 소요 시간 (ms) | 전송 크기 (B) | 리소스 크기 (B) | 상태 |
|---|---|---|---|---|---|
| 1 | 24.1 | 18.8 | 557036 | 556735 | 200 |
| 2 | 9.5 | 9.6 | 557036 | 556735 | 200 |
| 3 | 29.0 | 9.5 | 557036 | 556735 | 200 |
| 4 | 31.3 | 11.2 | 557036 | 556735 | 200 |
| 5 | 37.4 | 8.7 | 557036 | 556735 | 200 |

이 이미지는 `/_next/image` 경유가 아니라 `/_next/static/media/`에서 원본 파일 그대로 받았다. 같은 로드에서 `Max_Podium.edf56292.png`(558091 B)도 같은 방식으로 받았다.

#### 네트워크 요청 (`network-requests` audit)
- 전체 요청 수: 5회 모두 43건 (`localhost:3100` 36건, `api.jolpi.ca` 4건, `api.openf1.org` 3건). 직전 after의 실행 1(33건) 같은 편차는 이번에는 없었다.
- 외부 API 요청은 모두 resourceType `Fetch`, 상태 코드 전부 200. 소요 시간 = networkEndTime - networkRequestTime(ms).

| 실행 | api.jolpi.ca 요청 수 | api.jolpi.ca 소요 시간 (ms, next / results / sprint / qualifying) | api.openf1.org 요청 수 | api.openf1.org 소요 시간 (ms, sessions / session_result / drivers) |
|---|---|---|---|---|
| 1 | 4 | 352.7, 313.0, 351.7, 351.1 | 3 | 1049.0, 325.5, 309.0 |
| 2 | 4 | 380.2, 358.7, 408.9, 408.4 | 3 | 1041.6, 322.9, 303.9 |
| 3 | 4 | 525.0, 821.7, 512.5, 877.2 | 3 | 960.9, 314.8, 301.4 |
| 4 | 4 | 786.9, 789.5, 772.0, 822.9 | 3 | 1014.9, 325.3, 334.8 |
| 5 | 4 | 440.3, 439.4, 341.6, 348.2 | 3 | 1073.3, 316.8, 301.2 |

- jolpi.ca 요청 4건: `/ergast/f1/current/next.json`, `/ergast/f1/current/last/results.json`, `/ergast/f1/current/last/sprint.json`, `/ergast/f1/current/last/qualifying.json` 각 1건.
- openf1.org 요청 3건: `/v1/sessions?year=2026`, `/v1/session_result?meeting_key=1299`, `/v1/drivers?session_key=11405` 각 1건.

### 서버 로그 429
- 서버 로그(`npx next start -p 3100`의 stdout/stderr)에서 `429` 포함 줄 0건, `Error fetching round` 줄 0건 (로그 전체 6줄, 기동 메시지와 `images.domains` deprecated 경고뿐). 이번에는 `/driverChart` 요청 중 Jolpica 429가 기록되지 않았다. 직전 after(54건)와 달라진 원인은 확인하지 않았다.

### 주석
- 외부 API(OpenF1, Jolpica) 응답 시간에 따라 cold 값이 흔들릴 수 있다.
- `/`는 빌드 시 정적 생성(○)이라 서버 TTFB에 외부 API 대기가 포함되지 않는다. 대신 브라우저가 페이지 로드 중 외부 API를 직접 호출한다.
- 이번에는 429가 없었으므로 `/driverChart` TTFB(cold 0.047 / warm 0.010~0.012 s)가 직전 after와 같은 조건(429 포함)의 값인지는 확인되지 않는다. 직접 비교하지 않는다.
- 측정 실패 항목: 없음. 단 `largest-contentful-paint-element` audit은 Lighthouse 13.6.0에 없어 `lcp-breakdown-insight`로 대체했다.

## 재현 비교 (after 홈 개선 1차 vs after 재측정, 같은 커밋 `ec9e34f`)

변화율 = (재측정 - 직전) / 직전, 표에 적힌 두 값에서 계산. Lighthouse는 정수 반올림 중앙값 기준.

### Lighthouse

| 지표 | 직전 after (중앙값) | 재측정 (중앙값) | 변화 | 직전 5회 범위 | 재측정 5회 범위 | 범위 겹침 |
|---|---|---|---|---|---|---|
| Performance | 76 | 76 | 0.0% | 76~76 | 76~76 | 겹침 |
| FCP (ms) | 756 | 756 | 0.0% | 756~757 | 755~759 | 겹침 |
| LCP (ms) | 7506 | 7581 | +1.0% | 7432~7656 | 7506~7655 | 겹침 |
| TBT (ms) | 0 | 24 | 직전이 0이라 계산 불가 | 0~34 | 0~33 | 겹침 |
| CLS | 0.0000 | 0.0000 | 0.0% | 0.0000~0.0004 | 0.0000 | 겹침 |
| Speed Index (ms) | 982 | 997 | +1.5% | 964~1050 | 969~1017 | 겹침 |

### LCP 구성

| 항목 | 직전 after | 재측정 |
|---|---|---|
| LCP 요소 | `<img alt="Norris" fetchpriority="high">` (`loading` 없음) | 같음 |
| TTFB 구간 (ms, 범위) | 4.0~4.7 | 3.9~4.7 |
| resource load delay (ms, 범위) | 5.6~35.0 | 5.5~33.4 |
| resource load duration (ms, 범위) | 8.5~17.9 | 9.1~19.2 |
| element render delay (ms, 범위) | 426.9~883.1 | 435.2~871.7 |
| 구간 합계 vs LCP 값 | 합계 약 0.5~0.9초, LCP 약 7.4~7.7초 | 합계 0.48~0.91초, LCP 7.51~7.66초 |

### 네트워크 요청

| 항목 | 직전 after | 재측정 |
|---|---|---|
| 전체 요청 수 | 실행 1 = 33, 실행 2~5 = 43 | 5회 모두 43 |
| api.jolpi.ca / api.openf1.org | 4 / 3 | 4 / 3 |
| 서버 로그 429 포함 줄 | 54 | 0 |

### 빌드 크기, TTFB

- 빌드 크기: 모든 라우트의 Size, First Load JS가 직전 after와 같다.

| 경로 | 지표 | 직전 after (s) | 재측정 (s) | 변화 |
|---|---|---|---|---|
| / | cold | 0.005843 | 0.065992 | +1029.4% |
| / | warm median | 0.002015 | 0.002058 | +2.1% |
| /driverChart | cold | 0.049041 | 0.047496 | -3.2% |
| /driverChart | warm median | 0.015900 | 0.010986 | -30.9% |

TTFB는 밀리초 단위이고, 직전 `/driverChart`는 429가 섞인 값, 이번에는 429가 없는 값이라 변화율을 개선·악화의 근거로 쓰지 않는다.

### 재현 여부 (사실만)
- Performance 76이 양쪽 5회 모두 같다. LCP는 직전 7432~7656 ms, 재측정 7506~7655 ms로 5회 범위가 겹치고, 중앙값 차이는 75 ms(+1.0%)다. 따라서 같은 커밋·같은 조건에서 LCP 약 7.5초가 다시 나왔다 (재현됨).
- LCP 요소(같은 이미지, `fetchpriority="high"`, `loading` 없음)와 요청 수(43건, jolpi 4 / openf1 3)도 같다.
- 이번 측정에서는 포트 3000 서버가 없었고 서버 로그 429도 0건이었는데도 LCP 값은 같은 수준이었다.
- 재현은 확인했지만 LCP 7.5초와 구간 합계(약 0.5~0.9초)의 차이 원인은 이번 측정으로 확인하지 못했다.

## 정리 메모 (2026-11-20)

- 홈 개선 1차(서버 컴포넌트 전환 `b24ba0a`, 첫 카드 `priority` `ec9e34f`, 드라이버 사진 `unoptimized` 제거 `0332b9d`)까지 진행했다. 마지막 커밋(`0332b9d`)은 측정하지 않았다.
- 확인된 사실: 브라우저가 보낸 `api.jolpi.ca` 요청이 6건 → 4건으로 줄었다(`08cab79` → `ec9e34f`, 5회 모두 같은 값).
- LCP는 `08cab79` 4162 ms → `ec9e34f` 7506 ms로 높게 나왔고 같은 커밋 재측정에서도 재현됐다(7581 ms). 그러나 LCP 구간 합계(약 0.5~0.9초)와 보고 값(약 7.5초)이 크게 달라, 이 값이 개선·악화를 나타낸다고 해석하지 않는다. **LCP 해석은 보류**하며 이력서 등에 이 수치를 쓰지 않는다.
- 이후 홈의 나머지 섹션(`RaceResults`, `UpcomingRaceLink`) 서버 전환과 추가 측정은 하지 않고, 모바일 확인과 기능 추가 단계로 넘어간다.
