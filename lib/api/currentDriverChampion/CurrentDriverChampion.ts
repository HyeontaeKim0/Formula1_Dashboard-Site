import {
  fetchJolpica,
  toLegacyTeamName,
  type JolpicaConstructor,
  type JolpicaDriver,
} from "@/lib/jolpica";

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
  driver: Driver;
  team: Team;
}

interface JolpicaDriverStandings {
  StandingsTable: {
    StandingsLists: {
      DriverStandings: {
        position: string;
        points: string;
        wins: string;
        Driver: JolpicaDriver;
        Constructors: JolpicaConstructor[];
      }[];
    }[];
  };
}

export const getCurrentDriverChampion = async (): Promise<
  DriverChampion[] | null
> => {
  try {
    const data = await fetchJolpica<JolpicaDriverStandings>(
      "current/driverstandings.json"
    );
    const standings = data.StandingsTable.StandingsLists[0]?.DriverStandings;
    if (!standings?.length) {
      console.warn("No driver champion data available.");
      return null;
    }
    return standings.map((s) => {
      // 시즌 중 이적 시 Constructors가 여러 개 → 마지막이 현재 소속
      const constructor = s.Constructors[s.Constructors.length - 1];
      const d = s.Driver;
      return {
        classificationId: Number(s.position),
        driverId: d.driverId,
        teamId: constructor.constructorId,
        points: Number(s.points),
        position: Number(s.position),
        wins: Number(s.wins),
        driver: {
          name: d.givenName,
          surname: d.familyName,
          nationality: d.nationality,
          birthday: d.dateOfBirth,
          number: Number(d.permanentNumber ?? 0),
          shortName: d.code ?? d.driverId,
          url: d.url,
        },
        team: {
          teamId: constructor.constructorId,
          teamName: toLegacyTeamName(
            constructor.constructorId,
            constructor.name
          ),
          country: constructor.nationality,
          firstAppareance: 0,
          constructorsChampionships: null,
          driversChampionships: null,
          url: constructor.url,
        },
      };
    });
  } catch (error) {
    console.error("Error fetching driver champion:", error);
    return null;
  }
};
