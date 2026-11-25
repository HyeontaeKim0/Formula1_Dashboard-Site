import type {
  SeasonScheduleResponse,
  NextRaceItem,
} from "@/lib/api/nextRacesApi/nextRacesApi";
import {
  getCircuitImageUrl,
  getCircuitName,
  getCountryFlagUrl,
} from "@/lib/utils/driverUtils";
import { formatKst } from "@/lib/utils/dateUtils";

export default function AllSeasonSchedulesCard({
  seasonSchedule,
}: {
  seasonSchedule: SeasonScheduleResponse;
}) {
  return (
    <section aria-label="시즌 전체 일정">
      <h2 className="mb-4 text-xl font-bold text-asphalt sm:mb-5 sm:text-2xl">
        시즌 전체 일정
      </h2>
      <div className="grid grid-cols-1 border-t border-rule md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {seasonSchedule.races.map((race: NextRaceItem) => (
          <div
            key={race.raceId}
            className="flex items-center justify-between gap-4 border-b border-rule py-4"
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="w-10 shrink-0 font-display text-3xl font-bold leading-none [font-stretch:125%] text-asphalt">
                {race.raceId}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <img
                    src={getCountryFlagUrl(race.circuit.country)}
                    alt={race.circuit.country}
                    width={20}
                    height={20}
                    className="h-5 w-5 shrink-0 object-contain"
                  />
                  <span className="truncate text-sm font-semibold text-asphalt">
                    {getCircuitName(race.circuit.circuitId)}
                  </span>
                </div>
                <div className="mt-0.5 truncate text-xs text-muted">
                  {race.raceName}
                </div>
                <div className="mt-1 text-xs text-muted">
                  {formatKst(
                    race.schedule?.race?.date,
                    race.schedule?.race?.time,
                  )}
                </div>
              </div>
            </div>
            <img
              src={getCircuitImageUrl(race.circuit.circuitId)}
              alt={race.circuit.circuitName}
              width={72}
              height={72}
              className="h-[72px] w-[72px] shrink-0 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
