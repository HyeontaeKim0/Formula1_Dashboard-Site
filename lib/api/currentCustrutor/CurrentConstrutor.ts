import {
  fetchJolpica,
  toLegacyTeamName,
  type JolpicaConstructor,
} from "@/lib/jolpica";

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

interface JolpicaConstructorStandings {
  StandingsTable: {
    StandingsLists: {
      ConstructorStandings: {
        position: string;
        points: string;
        wins: string;
        Constructor: JolpicaConstructor;
      }[];
    }[];
  };
}

export const getCurrentConstructorStandings = async (): Promise<
  ConstructorsChampionshipResponse[] | null
> => {
  try {
    const data = await fetchJolpica<JolpicaConstructorStandings>(
      "current/constructorstandings.json"
    );
    const standings =
      data.StandingsTable.StandingsLists[0]?.ConstructorStandings;
    if (!standings?.length) {
      console.warn("No constructors championship data available.");
      return null;
    }
    return standings.map((s) => ({
      classificationId: Number(s.position),
      teamId: s.Constructor.constructorId,
      points: Number(s.points),
      position: Number(s.position),
      wins: Number(s.wins),
      team: {
        teamName: toLegacyTeamName(
          s.Constructor.constructorId,
          s.Constructor.name
        ),
        country: s.Constructor.nationality,
        firstAppareance: 0,
        constructorsChampionships: null,
        driversChampionships: null,
        url: s.Constructor.url,
      },
    }));
  } catch (error) {
    console.error("Error fetching constructors championship:", error);
    return null;
  }
};
