export interface Team {
  teamId: string;
  teamName: string;
  country: string;
  firstAppareance: number;
  constructorsChampionships: number | null;
  driversChampionships: number | null;
  url: string;
}

export interface Driver {
  name: string;
  surname: string;
  nationality: string;
  birthday: string;
  number: number;
  shortName: string;
  url: string;
}
export interface DriverChampion {
  classificationId: number;
  driverId: string;
  teamId: string;
  points: number;
  position: number;
  wins: number;
  driver: Driver[];
  team: Team[];
}

export interface DriverChampionApiResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  total: number;
  season: number;
  championshipId: string;
  driver_championship: DriverChampion[];
}

export const getCurrentDriverChampion = async (): Promise<
  DriverChampion[] | null
> => {
  try {
    const response = await fetch(
      "https://f1api.dev/api/current/drivers-championship"
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch driver champion: ${response.status} ${response.statusText}`
      );
    }
    const data: DriverChampionApiResponse = await response.json();
    if (!data?.driver_championship?.length) {
      console.warn("No driver champion data available.");
      return null;
    }
    return data.driver_championship;
  } catch (error) {
    console.error("Error fetching driver champion:", error);
    return null;
  }
};
