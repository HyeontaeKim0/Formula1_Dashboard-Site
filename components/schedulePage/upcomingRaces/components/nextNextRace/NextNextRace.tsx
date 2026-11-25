import type {
  NextRacesResponse,
  SeasonScheduleResponse,
} from "@/lib/api/nextRacesApi/nextRacesApi";
import {
  getDDayLabel,
  getNextNextRaceImageUrl,
} from "@/lib/utils/scheduleUtils";
import { getCircuitName, getCountryFlagUrl } from "@/lib/utils/driverUtils";

export default function NextNextRace({
  seasonSchedule,
  upcomingRacesApi,
}: {
  upcomingRacesApi: NextRacesResponse;
  seasonSchedule: SeasonScheduleResponse;
}) {
  // 현재 라운드에서 +1 다시 문자열로 변환 TypeError: Cannot read properties of undefined (reading 'race')
  const nextRound = (Number(upcomingRacesApi?.race[0]?.raceId) + 1).toString();

  // nextRound에 해당하는 레이스 추출
  const nextRace = seasonSchedule?.races?.find(
    (race) => race.raceId === nextRound,
  );

  return (
    <div className="relative h-full min-h-[200px] w-full overflow-hidden">
      {/* 백그라운드를 이미지로 채우기 위에 전체 투명도 50% 검은 배경 씌우기 */}
      <div
        className="left-0 top-0 h-full min-h-[200px] w-full bg-cover bg-center p-5 sm:p-6"
        style={{
          backgroundImage: `url(${getNextNextRaceImageUrl(nextRace?.circuit.circuitId ?? "")})`,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="flex gap-4">
          <div className="flex items-center justify-center">
            <img
              src={getCountryFlagUrl(nextRace?.circuit.city ?? "")}
              alt={nextRace?.circuit.city ?? ""}
              width={50}
              height={50}
            />
          </div>
          <div>
            <div className="text-xl font-bold text-white sm:text-2xl">
              {getCircuitName(nextRace?.circuit.circuitId ?? "")}
            </div>
            <div className="text-xs  text-white">{nextRace?.raceName}</div>
          </div>
        </div>
        {/* 위치는 오른쪽 아래로 */}
        <div className="absolute bottom-6 right-6">
          <div className="text-right font-display text-5xl font-extrabold leading-none text-white [font-stretch:125%] sm:text-6xl">
            {getDDayLabel(
              nextRace?.schedule?.race?.date,
              nextRace?.schedule?.race?.time,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
