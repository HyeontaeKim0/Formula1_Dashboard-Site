const LAST_RACE_RESULT_API_URL = "https://f1api.dev/api/current/last/qualy";

interface DriverResult {
  fp1Id: number;
  driverId: string;
  teamId: string;
  time: string;
  driver: {
    driverId: string;
    name: string;
    surname: string;
    nationality: string;
    number: number;
    shortName: string;
    birthday: string;
    url: string;
  };
  team: {
    teamId: string;
    teamName: string;
    nationality: string;
    firstAppareance: number;
    constructorsChampionships: number;
    driversChampionships: number;
    url: string;
  };
}

interface LastQualifyResult {
  raceId: string;
  raceName: string;
  laps: number;
  qualyResults: DriverResult[];
}

export async function getLastQualifyResult(): Promise<LastQualifyResult | null> {
  try {
    const response = await fetch(LAST_RACE_RESULT_API_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch last qualify result: ${response.status} ${response.statusText}`
      );
    }
    const data: LastQualifyResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching last race result:", error);
    return null;
  }
}
