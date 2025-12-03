const LAST_PRACTICE_1_RESULT_API_URL = "https://f1api.dev/api/current/last/fp1";
const LAST_PRACTICE_2_RESULT_API_URL = "https://f1api.dev/api/current/last/fp2";
const LAST_PRACTICE_3_RESULT_API_URL = "https://f1api.dev/api/current/last/fp3";

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

interface LastPracticeResult {
  raceId: string;
  raceName: string;
  laps: number;
  practiceResults: DriverResult[];
}

export async function getLastPractice1Result(): Promise<LastPracticeResult | null> {
  try {
    const response = await fetch(LAST_PRACTICE_1_RESULT_API_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch last practice 1 result: ${response.status} ${response.statusText}`
      );
    }
    const data: LastPracticeResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching last practice 1 result:", error);
    return null;
  }
}

export async function getLastPractice2Result(): Promise<LastPracticeResult | null> {
  try {
    const response = await fetch(LAST_PRACTICE_2_RESULT_API_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch last practice 2 result: ${response.status} ${response.statusText}`
      );
    }
    const data: LastPracticeResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching last practice 2 result:", error);
    return null;
  }
}
export async function getLastPractice3Result(): Promise<LastPracticeResult | null> {
  try {
    const response = await fetch(LAST_PRACTICE_3_RESULT_API_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch last practice 3 result: ${response.status} ${response.statusText}`
      );
    }
    const data: LastPracticeResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching last practice 3 result:", error);
    return null;
  }
}
