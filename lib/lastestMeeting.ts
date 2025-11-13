const LASTEST_MEETING_API_URL = "https://f1api.dev/api/current/last";

interface LastestMeetingScheduleItem {
  date: string | null;
  time: string | null;
}

interface LastestMeetingSchedule {
  race: LastestMeetingScheduleItem;
  qualy: LastestMeetingScheduleItem;
  fp1: LastestMeetingScheduleItem;
  fp2: LastestMeetingScheduleItem;
  fp3: LastestMeetingScheduleItem;
  sprintQualy: LastestMeetingScheduleItem;
  sprintRace: LastestMeetingScheduleItem;
}

interface LastestMeetingFastLap {
  fast_lap: string;
  fast_lap_driver_id: string;
  fast_lap_team_id: string;
}

interface LastestMeetingCircuit {
  circuitId: string;
  circuitName: string;
  country: string;
  city: string;
  circuitLength: string;
  lapRecord: string;
  firstParticipationYear: number;
  corners: number;
  fastestLapDriverId: string;
  fastestLapTeamId: string;
  fastestLapYear: number;
  url: string;
}

interface LastestMeetingDriver {
  driverId: string;
  name: string;
  surname: string;
  country: string;
  birthday: string;
  number: number;
  shortName: string;
  url: string;
}

interface LastestMeetingTeam {
  teamId: string;
  teamName: string;
  country: string;
  firstAppearance: number;
  constructorsChampionships: number;
  driversChampionships: number;
  url: string;
}

interface LastestMeetingRace {
  raceId: string;
  championshipId: string;
  raceName: string;
  schedule: LastestMeetingSchedule;
  laps: number;
  round: number;
  url: string;
  fast_lap: LastestMeetingFastLap;
  circuit: LastestMeetingCircuit;
  winner: LastestMeetingDriver;
  teamWinner: LastestMeetingTeam;
}

interface LastestMeetingChampionship {
  championshipId: string;
  championshipName: string;
  url: string;
  year: number;
}

interface LastestMeetingResponse {
  api: string;
  url: string;
  total: number;
  season: number;
  round: number;
  championship: LastestMeetingChampionship;
  race: LastestMeetingRace[];
}

export interface LastestMeeting extends LastestMeetingRace {
  season: number;
  championship: LastestMeetingChampionship;
}

export async function getLastestMeeting(): Promise<LastestMeeting | null> {
  try {
    const response = await fetch(LASTEST_MEETING_API_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch lastest meeting: ${response.status} ${response.statusText}`
      );
    }

    const data: LastestMeetingResponse = await response.json();

    if (!data?.race?.length) {
      console.warn("No lastest meeting data available.");
      return null;
    }

    const [race] = data.race;

    return {
      season: data.season,
      championship: data.championship,
      ...race,
    };
  } catch (error) {
    console.error("Error fetching lastest meeting:", error);
    return null;
  }
}
