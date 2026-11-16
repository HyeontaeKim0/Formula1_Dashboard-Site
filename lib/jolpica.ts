const JOLPICA_BASE_URL = "https://api.jolpi.ca/ergast/f1";

// Jolpica constructorId → 기존 UI(driverUtils)가 매칭에 쓰는 팀 이름
const LEGACY_TEAM_NAME: Record<string, string> = {
  red_bull: "Red Bull Racing",
  mercedes: "Mercedes Formula 1 Team",
  mclaren: "McLaren Formula 1 Team",
  ferrari: "Scuderia Ferrari",
  williams: "Williams Racing",
  aston_martin: "Aston Martin F1 Team",
  haas: "Haas F1 Team",
  alpine: "Alpine F1 Team",
  rb: "RB F1 Team",
  audi: "Audi Revolut F1 Team",
  cadillac: "Cadillac Formula 1 Team",
};

export function toLegacyTeamName(constructorId: string, fallback: string) {
  return LEGACY_TEAM_NAME[constructorId] ?? fallback;
}

export interface JolpicaDriver {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface JolpicaConstructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export async function fetchJolpica<T>(path: string): Promise<T> {
  const response = await fetch(`${JOLPICA_BASE_URL}/${path}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(
      `Jolpica request failed (${path}): ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  return data.MRData as T;
}

export interface JolpicaCircuit {
  circuitId: string;
  circuitName: string;
  Location: { locality: string; country: string };
}

// Jolpica 드라이버/팀/서킷 → 기존 UI(f1api.dev 형태)가 읽는 모양
export function toLegacyDriver(d: JolpicaDriver) {
  return {
    driverId: d.driverId,
    name: d.givenName,
    surname: d.familyName,
    nationality: d.nationality,
    number: Number(d.permanentNumber ?? 0),
    shortName: d.code ?? d.driverId,
    birthday: d.dateOfBirth,
    url: d.url,
  };
}

export function toLegacyTeam(c: JolpicaConstructor) {
  return {
    teamId: c.constructorId,
    teamName: toLegacyTeamName(c.constructorId, c.name),
    nationality: c.nationality,
    url: c.url,
  };
}

// Ergast식 국가 약칭 → 기존 UI가 비교하는 전체 이름
const COUNTRY_NAME: Record<string, string> = {
  UAE: "United Arab Emirates",
  USA: "United States",
  UK: "United Kingdom",
};

export function toLegacyCircuit(c: JolpicaCircuit) {
  return {
    circuitId: c.circuitId,
    circuitName: c.circuitName,
    city: c.Location.locality,
    country: COUNTRY_NAME[c.Location.country] ?? c.Location.country,
  };
}
