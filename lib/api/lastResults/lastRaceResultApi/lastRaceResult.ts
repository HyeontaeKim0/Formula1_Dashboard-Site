import {
  fetchJolpica,
  toLegacyCircuit,
  toLegacyDriver,
  toLegacyTeam,
  type JolpicaCircuit,
  type JolpicaConstructor,
  type JolpicaDriver,
} from "@/lib/jolpica";

interface JolpicaRaceResults {
  RaceTable: {
    Races: {
      raceName: string;
      round: string;
      Circuit: JolpicaCircuit;
      Results: {
        position: string;
        points: string;
        laps: string;
        status: string;
        Driver: JolpicaDriver;
        Constructor: JolpicaConstructor;
        Time?: { time: string };
      }[];
    }[];
  };
}

export interface LastRaceResultResponse {
  raceId: string;
  raceName: string;
  races: {
    circuit: ReturnType<typeof toLegacyCircuit>;
    results: {
      position: number;
      points: number;
      laps: number;
      time: string;
      driver: ReturnType<typeof toLegacyDriver>;
      team: ReturnType<typeof toLegacyTeam>;
    }[];
  };
}

// 에러를 던지는 버전: 정적 페이지(ISR)가 실패한 결과를 저장하지 않도록 서버 컴포넌트에서 사용
// 마지막 레이스가 아직 없는 경우(Races가 빈 배열)는 에러가 아니라 null
export async function fetchLastRaceResult(): Promise<LastRaceResultResponse | null> {
  const data = await fetchJolpica<JolpicaRaceResults>(
    "current/last/results.json"
  );
  const race = data.RaceTable.Races[0];
  if (!race) return null;

  return {
    raceId: `${race.round}`,
    raceName: race.raceName,
    races: {
      circuit: toLegacyCircuit(race.Circuit),
      results: race.Results.map((r) => ({
        position: Number(r.position),
        points: Number(r.points),
        laps: Number(r.laps),
        time: r.Time?.time ?? "",
        driver: toLegacyDriver(r.Driver),
        team: toLegacyTeam(r.Constructor),
      })),
    },
  };
}

// 에러를 null로 바꾸는 안전판: 클라이언트 컴포넌트 등 기존 호출처용
export async function getLastRaceResult(): Promise<LastRaceResultResponse | null> {
  try {
    return await fetchLastRaceResult();
  } catch (error) {
    console.error("Error fetching last race result:", error);
    return null;
  }
}
