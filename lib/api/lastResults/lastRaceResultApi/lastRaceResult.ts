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

export async function getLastRaceResult(): Promise<LastRaceResultResponse | null> {
  try {
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
  } catch (error) {
    console.error("Error fetching last race result:", error);
    return null;
  }
}
