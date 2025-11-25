export interface Team {
  teamName: string;
  country: string;
  firstAppareance: number;
  constructorsChampionships: number | null;
  driversChampionships: number | null;
  url: string;
}

export interface ConstructorsChampionshipResponse {
  classificationId: number;
  teamId: string;
  points: number;
  position: number;
  wins: number;
  team: Team;
}

export interface ConstructorsChampionshipApiResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  total: number;
  season: number;
  championshipId: string;
  constructors_championship: ConstructorsChampionshipResponse[];
}

export const getCurrentConstructorStandings = async (): Promise<
  ConstructorsChampionshipResponse[] | null
> => {
  try {
    const response = await fetch(
      `https://f1api.dev/api/current/constructors-championship`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch constructors championship: ${response.status} ${response.statusText}`
      );
    }

    const data: ConstructorsChampionshipApiResponse = await response.json();

    if (!data?.constructors_championship?.length) {
      console.warn("No constructors championship data available.");
      return null;
    }

    return data.constructors_championship;
  } catch (error) {
    console.error("Error fetching constructors championship:", error);
    return null;
  }
};
