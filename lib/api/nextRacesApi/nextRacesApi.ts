import {
  fetchJolpica,
  toLegacyCircuit,
  type JolpicaCircuit,
} from "@/lib/jolpica";

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

interface JolpicaNextRace {
  RaceTable: {
    Races: {
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
    }[];
  };
}

const toScheduleItem = (s?: JolpicaSession): ScheduleItem | null =>
  s ? { date: s.date, time: s.time ?? "" } : null;

export async function getNextRaces(): Promise<NextRacesResponse> {
  try {
    const data = await fetchJolpica<JolpicaNextRace>("current/next.json");
    const race = data.RaceTable.Races[0];

    // 시즌 종료 등으로 다음 레이스가 없으면 호출한 쪽이 "데이터 없음"으로 처리
    if (!race) {
      throw new Error("No upcoming race available.");
    }

    const circuit = toLegacyCircuit(race.Circuit);

    return {
      season: Number(race.season),
      round: Number(race.round),
      race: [
        {
          raceId: race.round,
          raceName: race.raceName,
          circuit,
          country: circuit.country,
          schedule: {
            fp1: toScheduleItem(race.FirstPractice),
            fp2: toScheduleItem(race.SecondPractice),
            fp3: toScheduleItem(race.ThirdPractice),
            qualy: toScheduleItem(race.Qualifying),
            sprintQualy: toScheduleItem(
              race.SprintQualifying ?? race.SprintShootout
            ),
            sprintRace: toScheduleItem(race.Sprint),
            race: toScheduleItem({ date: race.date, time: race.time }),
          },
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching next races:", error);
    throw error;
  }
}

// 이전 타입과의 호환성을 위한 export
export type NextRaces = NextRaceItem;
