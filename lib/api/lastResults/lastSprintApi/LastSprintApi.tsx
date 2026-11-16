import {
  fetchJolpica,
  toLegacyDriver,
  toLegacyTeam,
  type JolpicaConstructor,
  type JolpicaDriver,
} from "@/lib/jolpica";

interface JolpicaSprint {
  RaceTable: {
    Races: {
      raceName: string;
      round: string;
      SprintResults: {
        position: string;
        points: string;
        laps: string;
        Driver: JolpicaDriver;
        Constructor: JolpicaConstructor;
        Time?: { time: string };
      }[];
    }[];
  };
}

interface LastSprintResult {
  raceId: string;
  raceName: string;
  races: {
    sprintRaceResults: {
      position: number;
      points: number;
      laps: number;
      time: string;
      driver: ReturnType<typeof toLegacyDriver>;
      team: ReturnType<typeof toLegacyTeam>;
    }[];
  };
}

// 스프린트가 없는 주말이면 null (RaceResults가 null일 때 FP2·FP3를 불러옴)
export async function getLastSprintRaceResult(): Promise<LastSprintResult | null> {
  try {
    const data = await fetchJolpica<JolpicaSprint>("current/last/sprint.json");
    const race = data.RaceTable.Races[0];
    if (!race) return null;

    return {
      raceId: `${race.round}`,
      raceName: race.raceName,
      races: {
        sprintRaceResults: race.SprintResults.map((r) => ({
          position: Number(r.position),
          points: Number(r.points),
          laps: Number(r.laps),
          time: r.Time?.time ?? "",
          driver: toLegacyDriver(r.Driver),
          team: toLegacyTeam(r.Constructor),
        })),
      },
    };
  } catch (error) {
    console.error("Error fetching last sprint race result:", error);
    return null;
  }
}
