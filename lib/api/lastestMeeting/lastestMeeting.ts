import {
  fetchJolpica,
  toLegacyCircuit,
  toLegacyDriver,
  toLegacyTeam,
  type JolpicaCircuit,
  type JolpicaConstructor,
  type JolpicaDriver,
} from "@/lib/jolpica";

interface JolpicaLastRace {
  RaceTable: {
    Races: {
      season: string;
      round: string;
      raceName: string;
      Circuit: JolpicaCircuit;
      Results?: {
        position: string;
        laps: string;
        Driver: JolpicaDriver;
        Constructor: JolpicaConstructor;
      }[];
    }[];
  };
}

// 서킷 상세(랩 기록·코너 수 등)는 Jolpica에 없어 제외 — 별도 작업 예정
export interface LastestMeeting {
  season: number;
  round: number;
  raceId: string;
  raceName: string;
  laps: number;
  circuit: ReturnType<typeof toLegacyCircuit>;
  winner: ReturnType<typeof toLegacyDriver> | null;
  teamWinner: ReturnType<typeof toLegacyTeam> | null;
}

// 에러를 던지는 버전: 정적 페이지(ISR)가 실패한 결과를 저장하지 않도록 서버 컴포넌트에서 사용
// 마지막 레이스가 아직 없는 경우(Races가 빈 배열)는 에러가 아니라 null
export async function fetchLastestMeeting(): Promise<LastestMeeting | null> {
  const data = await fetchJolpica<JolpicaLastRace>(
    "current/last/results.json"
  );
  const race = data.RaceTable.Races[0];

  if (!race) {
    console.warn("No lastest meeting data available.");
    return null;
  }

  // 우승자가 없으면 winner: null → UI가 취소/캘린더 제외로 처리
  const winnerResult = race.Results?.find((r) => r.position === "1");

  return {
    season: Number(race.season),
    round: Number(race.round),
    raceId: race.round,
    raceName: race.raceName,
    laps: winnerResult ? Number(winnerResult.laps) : 0,
    circuit: toLegacyCircuit(race.Circuit),
    winner: winnerResult ? toLegacyDriver(winnerResult.Driver) : null,
    teamWinner: winnerResult ? toLegacyTeam(winnerResult.Constructor) : null,
  };
}

// 에러를 null로 바꾸는 안전판: driverChart 등 기존 호출처용
export async function getLastestMeeting(): Promise<LastestMeeting | null> {
  try {
    return await fetchLastestMeeting();
  } catch (error) {
    console.error("Error fetching lastest meeting:", error);
    return null;
  }
}
