import type {
  NextRaceItem,
  SeasonScheduleResponse,
} from "@/lib/api/nextRacesApi/nextRacesApi";

import { getCircuitImageUrl, getCircuitName } from "@/lib/utils/driverUtils";
import { formatKst } from "@/lib/utils/dateUtils";

export default function AllSeasonSchedules({
  seasonSchedule,
}: {
  seasonSchedule: SeasonScheduleResponse;
}) {
  console.log("seasonSchedule", seasonSchedule);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {seasonSchedule.races.map((race: NextRaceItem) => (
          <div
            key={race.raceId}
            className="border p-5 rounded-md flex flex-col items-center justify-between"
          >
            <div className="w-full h-full">
              <img
                src={getCircuitImageUrl(race.circuit.circuitId)}
                alt={race.circuit.circuitName}
                width={100}
                height={100}
              />
            </div>
            <div className="w-full h-full mt-3">
              <div>{race.raceName}</div>
              <div> {getCircuitName(race.circuit.circuitId)}</div>
              <div>
                {formatKst(
                  race.schedule?.race?.date,
                  race.schedule?.race?.time,
                )}
              </div>
              <div>{race.schedule?.race?.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
