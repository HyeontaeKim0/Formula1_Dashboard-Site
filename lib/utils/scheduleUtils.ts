import type { NextRaceItem } from "@/lib/api/nextRacesApi/nextRacesApi";
import { parseUtc } from "./dateUtils";

import AbuDhabiPicture from "@/assets/img/gp/Abu_Dhabi.webp";
import LosailPicture from "@/assets/img/gp/Losail.webp";

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

// 한국 날짜(KST) 기준 "YYYY-MM-DD"를 UTC 자정 시각(ms)으로 바꿔 날짜 차이를 정수로 계산하게 한다
const kstDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
});
const kstDayMs = (d: Date) => Date.parse(kstDateFormatter.format(d));

// 화면에 보이는 한국 날짜 기준 D-day 라벨. 당일 "D-Day", 이전 "D-N", 이후 "D+N". 날짜가 없으면 "".
export function getDDayLabel(
  date?: string | null,
  time?: string | null,
  now: Date = new Date(),
): string {
  if (!date) return "";
  const target = parseUtc(date, time ?? "00:00:00Z");
  if (!target) return "";
  const diff = Math.round((kstDayMs(target) - kstDayMs(now)) / 86_400_000);
  if (diff === 0) return "D-Day";
  return diff > 0 ? `D-${diff}` : `D+${-diff}`;
}

export function getNextNextRaceImageUrl(circuit_name: string) {
  switch (circuit_name) {
    case "yas_marina":
      return AbuDhabiPicture.src;

    case "losail":
      return LosailPicture.src;
  }
}
