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
