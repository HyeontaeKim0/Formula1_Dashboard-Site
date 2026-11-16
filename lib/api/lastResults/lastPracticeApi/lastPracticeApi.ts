const OPENF1_BASE_URL = "https://api.openf1.org/v1";

interface OpenF1Session {
  session_key: number;
  session_name: string;
  meeting_key: number;
  date_end: string;
}

interface OpenF1PracticeResult {
  session_key: number;
  position: number;
  driver_number: number;
  duration?: number | null;
}

interface OpenF1PracticeDriver {
  driver_number: number;
  name_acronym: string;
}

interface PracticeResultItem {
  gridPosition: number;
  time: string;
  driver: {
    number: number;
    shortName: string;
    code: string;
    driverId: string;
  };
}

type PracticeKey = "fp1Results" | "fp2Results" | "fp3Results";

type LastPracticeResult = {
  raceId: string;
  races: Record<PracticeKey, PracticeResultItem[]>;
};

async function getJson<T>(path: string, retries = 1): Promise<T> {
  const response = await fetch(`${OPENF1_BASE_URL}/${path}`);
  // 호출 제한(429)이면 retry-after만큼 기다렸다가 한 번 더 시도
  if (response.status === 429 && retries > 0) {
    const wait = Number(response.headers.get("retry-after")) || 1;
    await new Promise((resolve) => setTimeout(resolve, wait * 1000));
    return getJson<T>(path, retries - 1);
  }
  if (!response.ok) {
    throw new Error(
      `OpenF1 request failed (${path}): ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

interface WeekendData {
  meetingKey: number;
  sessionKeyByName: Map<string, number>;
  results: OpenF1PracticeResult[];
  acronyms: Map<number, string>;
}

// FP1·FP2·FP3가 같은 주말 데이터를 쓰므로 한 번만 불러서 공유한다.
// (OpenF1 호출 제한 대응: 세션 수와 상관없이 총 3번 호출. 실패하면 캐시를 비워 재시도)
let weekendPromise: Promise<WeekendData | null> | null = null;

// 종료된 마지막 레이스가 속한 주말
// (meeting_key=latest는 다음 주말이 시작되면 넘어가서 레이스 탭과 어긋남)
function loadWeekend(): Promise<WeekendData | null> {
  if (!weekendPromise) {
    weekendPromise = (async () => {
      const year = new Date().getFullYear();
      const sessions = await getJson<OpenF1Session[]>(`sessions?year=${year}`);

      const now = Date.now();
      const lastRace = sessions
        .filter(
          (s) =>
            s.session_name === "Race" && new Date(s.date_end).getTime() < now
        )
        .sort((a, b) => a.date_end.localeCompare(b.date_end))
        .at(-1);
      if (!lastRace) return null;

      const sessionKeyByName = new Map(
        sessions
          .filter((s) => s.meeting_key === lastRace.meeting_key)
          .map((s) => [s.session_name, s.session_key])
      );
      const firstPracticeKey = sessionKeyByName.get("Practice 1");
      if (firstPracticeKey === undefined) return null;

      const [results, drivers] = await Promise.all([
        getJson<OpenF1PracticeResult[]>(
          `session_result?meeting_key=${lastRace.meeting_key}`
        ),
        getJson<OpenF1PracticeDriver[]>(
          `drivers?session_key=${firstPracticeKey}`
        ),
      ]);

      return {
        meetingKey: lastRace.meeting_key,
        sessionKeyByName,
        results,
        acronyms: new Map(drivers.map((d) => [d.driver_number, d.name_acronym])),
      };
    })().catch((error) => {
      weekendPromise = null;
      throw error;
    });
  }
  return weekendPromise;
}

// 71.717 → "1:11.717"
function formatLapTime(seconds?: number | null): string {
  if (typeof seconds !== "number") return "";
  const minutes = Math.floor(seconds / 60);
  const rest = (seconds - minutes * 60).toFixed(3).padStart(6, "0");
  return `${minutes}:${rest}`;
}

async function getLastPracticeResult(
  practiceNumber: 1 | 2 | 3
): Promise<LastPracticeResult | null> {
  try {
    const weekend = await loadWeekend();
    if (!weekend) return null;

    const sessionKey = weekend.sessionKeyByName.get(
      `Practice ${practiceNumber}`
    );
    // 스프린트 주말은 FP2·FP3가 없음
    if (sessionKey === undefined) return null;

    const key = `fp${practiceNumber}Results` as PracticeKey;
    const items: PracticeResultItem[] = weekend.results
      .filter((r) => r.session_key === sessionKey)
      .map((r) => {
        const code =
          weekend.acronyms.get(r.driver_number) ?? String(r.driver_number);
        return {
          gridPosition: r.position,
          time: formatLapTime(r.duration),
          driver: {
            number: r.driver_number,
            shortName: code,
            code,
            driverId: code,
          },
        };
      });

    return {
      raceId: String(weekend.meetingKey),
      races: { fp1Results: [], fp2Results: [], fp3Results: [], [key]: items },
    };
  } catch (error) {
    console.error(`Error fetching last practice ${practiceNumber} result:`, error);
    return null;
  }
}

export const getLastPractice1Result = () => getLastPracticeResult(1);
export const getLastPractice2Result = () => getLastPracticeResult(2);
export const getLastPractice3Result = () => getLastPracticeResult(3);
