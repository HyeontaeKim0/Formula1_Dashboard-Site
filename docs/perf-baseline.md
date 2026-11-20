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
- 작업 트리 변경: 있음 (`git status --short`: ` M app/(site)/page.tsx`). 즉 커밋 `2de5263` 그대로가 아니라 `page.tsx`의 미커밋 수정이 포함된 상태의 측정값이다.
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
