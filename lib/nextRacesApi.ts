const NEXT_RACES_API_URL = "https://f1api.dev/api/current/next";

interface ScheduleItem {
  date: string;
  time: string;
}

export interface Schedule {
  qualy: string;
  fp1: ScheduleItem;
  fp2: string;
  fp3: string;
  sprintQualy: string;
  sprintRace: string;
}

export interface NextRaceItem {
  raceId: string;
  raceName: string;
  circuit: Circuit;
  country: string;
  schedule?: Schedule;
}

export interface Circuit {
  country: string;
  city: string;
}

export interface NextRacesResponse {
  api: string;
  url: string;
  total: number;
  season: number;
  round: number;

  race: NextRaceItem[];
  championship: {
    championshipId: string;
    championshipName: string;
    url: string;
  };
}

export async function getNextRaces(): Promise<NextRacesResponse> {
  try {
    const response = await fetch(NEXT_RACES_API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch next races: ${response.statusText}`);
    }
    const data: NextRacesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching next races:", error);
    throw error;
  }
}

// 이전 타입과의 호환성을 위한 export
export type NextRaces = NextRaceItem;
