export interface PodiumDriver {
  position: number;
  driverName: string;
  driverCode: string;
  team: string;
  teamColor?: string;
  imageUrl?: string;
  teamLogoUrl?: string;
  carImageUrl?: string;
}

export interface DriverStandingPodium {
  position: number;
  driver_number: number;
}

export interface DriverStanding {
  position: number;
  driverName: string;
  driverCode: string;
  team: string;
  points: number;
  wins: number;
  podiums: number;
  teamColor?: string;
}

export interface Driver {
  driverName: string;
  driverCode: string;
  team: string;
  teamColor: string;
  teamLogoUrl: string;
  driverImageUrl: string;
  points: number;
  wins: number;
  podiums: number;
  position: number;
  nationality: string;
  driverNumber?: number;
  countryCode?: string;
}

export interface DriversSectionProps {
  drivers?: Driver[];
}

export type RaceEventType = "practice" | "qualifying" | "sprint" | "race";

export interface Sessions {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_end: string;
  date_start: string;
  gmt_offset: string;
  location: string;
  meeting_key: number;
  session_key: number;
  session_name: string;
  session_type: string;
  year: number;
}

export interface RaceEvent {
  name: string;
  date: string;
  time: string;
  daysUntil: number;
  type: string;
}

export interface NewsItem {
  title: string;
  author: string;
  timeAgo: string;
  category?: string;
  trending?: boolean;
  url: string;
  image: string;
  description: string;
}

export interface DriverResult {
  position: number;
  driverName: string;
  driverCode: string;
  team: string;
  time2?: string;
  time3?: string;
  driverNumber: string;
  time: string;
  laps: number;
  points: number;
  highlight?: string;
  teamColor?: string;
}

// F1 API 응답 구조에 맞춘 타입 정의
export interface RaceResultDriver {
  driverId: string;
  number: number;
  shortName: string;
  url: string;
  name: string;
  surname: string;
  nationality: string;
  birthday: string;
}

export interface RaceResultTeam {
  teamId: string;
  teamName: string;
  nationality: string;
  firstAppareance: number;
  constructorsChampionships: number;
  driversChampionships: number;
  url: string;
}

export interface RaceResultItem {
  position: number;
  points: number;
  grid: number;
  time: string;
  fastLap: string | null;
  retired: string | null;
  driver: RaceResultDriver;
  team: RaceResultTeam;
}

// API 응답 전체 구조 (배열 또는 래핑된 객체일 수 있음)
export type RaceResultResponse =
  | RaceResultItem[]
  | {
      results?: RaceResultItem[];
    }
  | {
      races?: {
        results?: RaceResultItem[];
      };
    };

export interface SessionResult {
  dnf: boolean;
  dns: boolean;
  dsq: boolean;
  driver_number: number;
  duration: number;
  gap_to_leader: number;
  number_of_laps: number;
  meeting_key: number;
  position: number;
  session_key: number;
}

export interface Meeting {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_start: string;
  gmt_offset: string;
  location: string;
  meeting_key: number;
  meeting_name: string;
  meeting_official_name: string;
  year: number;
}

export interface OpenF1Driver {
  broadcast_name: string;
  country_code: string;
  driver_number: number;
  first_name: string;
  full_name: string;
  headshot_url: string;
  last_name: string;
  meeting_key: number;
  name_acronym: string;
  session_key: number;
  team_colour: string;
  team_name: string;
}
