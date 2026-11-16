import type { RaceResultItem } from "@/lib/types/types";
import {
  fetchJolpica,
  toLegacyDriver,
  toLegacyTeam,
  type JolpicaConstructor,
  type JolpicaDriver,
} from "@/lib/jolpica";

interface JolpicaRoundResults {
  RaceTable: {
    Races: {
      Results: {
        position: string;
        positionText: string;
        points: string;
        grid: string;
        status: string;
        Driver: JolpicaDriver;
        Constructor: JolpicaConstructor;
        Time?: { time: string };
        FastestLap?: { Time?: { time: string } };
      }[];
    }[];
  };
}

const defaultDriverResultChartData: RaceResultItem[] = [];

export async function getDriverResultChartData(
  year: number,
  round: number
): Promise<RaceResultItem[]> {
  try {
    const data = await fetchJolpica<JolpicaRoundResults>(
      `${year}/${round}/results.json`
    );
    // 아직 열리지 않은 라운드는 Races가 빈 배열
    const results = data.RaceTable.Races[0]?.Results;
    if (!results) return defaultDriverResultChartData;

    return results.map((r) => ({
      position: Number(r.position),
      points: Number(r.points),
      grid: Number(r.grid),
      time: r.Time?.time ?? "",
      fastLap: r.FastestLap?.Time?.time ?? null,
      // positionText가 숫자가 아니면(R·D·W 등) 완주하지 못한 것 → 사유(status)
      retired: /^\d+$/.test(r.positionText) ? null : r.status,
      driver: toLegacyDriver(r.Driver),
      team: toLegacyTeam(r.Constructor),
    }));
  } catch (error) {
    console.error(`Error fetching round ${round} results:`, error);
    return defaultDriverResultChartData;
  }
}
