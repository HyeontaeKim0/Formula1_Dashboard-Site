import {
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
  console.log(seasonSchedule);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {seasonSchedule.races.map((race: NextRaceItem) => (
        <div className="border p-5 rounded-xl flex flex-col justify-between">
          <div className="flex justify-between gap-4">
            <div key={race.raceId}>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src={getCountryFlagUrl(race.circuit.country)}
                    alt={race.circuit.country}
                    width={25}
                    height={25}
                  />
                  <div className="text-sm font-bold">{race.raceId}</div>Round
                </div>
                <div className="text-lg font-bold mt-2">
                  {getCircuitName(race.circuit.circuitId)}
                </div>
                <div className="text-sm font-bold">{race.raceName}</div>
              </div>
            </div>
            <div>
              <img
                src={getCircuitImageUrl(race.circuit.circuitId)}
                alt={race.circuit.circuitName}
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <div>
              {formatKst(race.schedule?.race?.date, race.schedule?.race?.time)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
