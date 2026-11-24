import type { SeasonScheduleResponse } from "@/lib/api/nextRacesApi/nextRacesApi";

import AllSeasonSchedulesCard from "./components/AllSeasonSchedulesCard";
export default function AllSeasonSchedules({
  seasonSchedule,
}: {
  seasonSchedule: SeasonScheduleResponse;
}) {
  return <AllSeasonSchedulesCard seasonSchedule={seasonSchedule} />;
}
