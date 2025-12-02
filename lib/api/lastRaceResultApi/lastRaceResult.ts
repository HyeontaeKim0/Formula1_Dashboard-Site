const LAST_RACE_RESULT_API_URL = "https://f1api.dev/api/current/last/race";

interface LastRaceResult {
  raceId: string;
  raceName: string;
  laps: number;
  drivers: string[];
  winner: string;
  teamWinner: string;
  fastestLap: string;
  fastestLapDriver: string;
  fastestLapTeam: string;
  position: number;
}

export interface LastRaceResultResponse {
  raceId: string;
  raceName: string;
  laps: number;
  drivers: string[];
  teams: string[];
  winner: string;
  teamWinner: string;
  fastestLap: string;
  fastestLapDriver: string;
  fastestLapTeam: string;
  position: number;
}

export async function getLastRaceResult(): Promise<LastRaceResult | null> {
  try {
    const response = await fetch(LAST_RACE_RESULT_API_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch last race result: ${response.status} ${response.statusText}`
      );
    }
    const data: LastRaceResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching last race result:", error);
    return null;
  }
}
