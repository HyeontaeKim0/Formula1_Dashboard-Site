import {
  fetchJolpica,
  toLegacyCircuit,
  type JolpicaCircuit,
} from "@/lib/jolpica";
import { CIRCUIT_DETAILS } from "@/lib/utils/circuitDetails";

interface ScheduleItem {
  date: string;
  time: string;
}

export interface Schedule {
  qualy: ScheduleItem | null;
  fp1: ScheduleItem | null;
  fp2: ScheduleItem | null;
  fp3: ScheduleItem | null;
  sprintQualy: ScheduleItem | null;
  sprintRace: ScheduleItem | null;
  race: ScheduleItem | null;
}

// 서킷 상세(길이·코너·랩 기록 등)는 Jolpica에 없어 optional — 별도 작업 예정
export interface Circuit {
  circuitId: string;
  circuitName: string;
  city: string;
  country: string;
  circuitLength?: string;
  lapRecord?: string;
  firstParticipationYear?: number;
  corners?: number;
  fastestLapDriverId?: string;
  fastestLapYear?: number;
  fastestLapTeamId?: string;
}

export interface NextRaceItem {
  raceId: string;
  raceName: string;
  circuit: Circuit;
  country: string;
  schedule?: Schedule;
}

export interface NextRacesResponse {
  season: number;
  round: number;
  race: NextRaceItem[];
}

interface JolpicaSession {
  date: string;
  time?: string;
}

interface JolpicaRaceEntry {
  season: string;
  round: string;
  raceName: string;
  Circuit: JolpicaCircuit;
  date: string;
  time?: string;
  FirstPractice?: JolpicaSession;
  SecondPractice?: JolpicaSession;
  ThirdPractice?: JolpicaSession;
  Qualifying?: JolpicaSession;
  Sprint?: JolpicaSession;
  SprintQualifying?: JolpicaSession;
  SprintShootout?: JolpicaSession;
}

interface JolpicaNextRace {
  RaceTable: {
    Races: JolpicaRaceEntry[];
  };
}

const toScheduleItem = (s?: JolpicaSession): ScheduleItem | null =>
  s ? { date: s.date, time: s.time ?? "" } : null;

// Jolpica 레이스 한 건 → NextRaceItem (다음 레이스와 시즌 전체 일정이 같이 사용)
function toNextRaceItem(race: JolpicaRaceEntry): NextRaceItem {
  const base = toLegacyCircuit(race.Circuit);
  // Jolpica에 없는 서킷 상세는 직접 관리하는 데이터에서 보충
  const circuit: Circuit = { ...base, ...CIRCUIT_DETAILS[base.circuitId] };

  return {
    raceId: race.round,
    raceName: race.raceName,
    circuit,
    country: circuit.country,
    schedule: {
      fp1: toScheduleItem(race.FirstPractice),
      fp2: toScheduleItem(race.SecondPractice),
      fp3: toScheduleItem(race.ThirdPractice),
      qualy: toScheduleItem(race.Qualifying),
      sprintQualy: toScheduleItem(race.SprintQualifying ?? race.SprintShootout),
      sprintRace: toScheduleItem(race.Sprint),
      race: toScheduleItem({ date: race.date, time: race.time }),
    },
  };
}

export async function getNextRaces(): Promise<NextRacesResponse> {
  try {
    const data = await fetchJolpica<JolpicaNextRace>("current/next.json");
    const race = data.RaceTable.Races[0];

    // 시즌 종료 등으로 다음 레이스가 없으면 호출한 쪽이 "데이터 없음"으로 처리
    if (!race) {
      throw new Error("No upcoming race available.");
    }

    return {
      season: Number(race.season),
      round: Number(race.round),
      race: [toNextRaceItem(race)],
    };
  } catch (error) {
    console.error("Error fetching next races:", error);
    throw error;
  }
}

export interface SeasonScheduleResponse {
  season: number;
  races: NextRaceItem[];
}

// 시즌 전체 일정 (라운드 순서). 요청 1회, 오류는 던진다(서버 컴포넌트에서 error.tsx가 처리)
export async function getSeasonSchedule(): Promise<SeasonScheduleResponse> {
  const data = await fetchJolpica<JolpicaNextRace>("current.json");
  const races = data.RaceTable.Races;

  if (races.length === 0) {
    throw new Error("No season schedule available.");
  }

  return {
    season: Number(races[0].season),
    races: races.map(toNextRaceItem),
  };
}

// 이전 타입과의 호환성을 위한 export
export type NextRaces = NextRaceItem;
