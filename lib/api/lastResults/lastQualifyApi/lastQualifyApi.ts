import {
  fetchJolpica,
  toLegacyDriver,
  toLegacyTeam,
  type JolpicaConstructor,
  type JolpicaDriver,
} from "@/lib/jolpica";

interface JolpicaQualifying {
  RaceTable: {
    Races: {
      raceName: string;
      round: string;
      QualifyingResults: {
        position: string;
        Driver: JolpicaDriver;
        Constructor: JolpicaConstructor;
        Q1?: string;
        Q2?: string;
        Q3?: string;
      }[];
    }[];
  };
}

interface QualifyResultItem {
  gridPosition: number;
  q1: string;
  q2: string;
  q3: string;
  driver: ReturnType<typeof toLegacyDriver>;
  team: ReturnType<typeof toLegacyTeam>;
}

// RaceResults는 races.qualyResults, driverChart는 qualyResults를 읽어서 둘 다 제공
interface LastQualifyResult {
  raceId: string;
  raceName: string;
  qualyResults: QualifyResultItem[];
  races: { qualyResults: QualifyResultItem[] };
}

export async function getLastQualifyResult(): Promise<LastQualifyResult | null> {
  try {
    const data = await fetchJolpica<JolpicaQualifying>(
      "current/last/qualifying.json"
    );
    const race = data.RaceTable.Races[0];
    if (!race) return null;

    const qualyResults = race.QualifyingResults.map((r) => ({
      gridPosition: Number(r.position),
      q1: r.Q1 ?? "",
      q2: r.Q2 ?? "",
      q3: r.Q3 ?? "",
      driver: toLegacyDriver(r.Driver),
      team: toLegacyTeam(r.Constructor),
    }));

    return {
      raceId: `${race.round}`,
      raceName: race.raceName,
      qualyResults,
      races: { qualyResults },
    };
  } catch (error) {
    console.error("Error fetching last qualify result:", error);
    return null;
  }
}
