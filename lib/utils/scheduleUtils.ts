import type { NextRaceItem } from "@/lib/api/nextRacesApi/nextRacesApi";
import { parseUtc } from "./dateUtils";

// 레이스 시작 후 이 시간까지는 아직 "다음 레이스"로 본다 (진행 중인 레이스가 바로 사라지지 않게)
const RACE_DURATION_MS = 3 * 60 * 60 * 1000;

// 레이스 시작 + 3시간이 아직 지나지 않은 첫 라운드. 시즌이 끝났으면 undefined.
export function findNextRace(
  races: NextRaceItem[],
  now: Date = new Date(),
): NextRaceItem | undefined {
  return races.find((race) => {
    const raceItem = race.schedule?.race;
    if (!raceItem?.date) return false;
    // 시간이 없으면 그날 끝(UTC)까지를 기준으로 한다
    const start = parseUtc(raceItem.date, raceItem.time ?? "23:59:59Z");
    return start !== null && start.getTime() + RACE_DURATION_MS > now.getTime();
  });
}
