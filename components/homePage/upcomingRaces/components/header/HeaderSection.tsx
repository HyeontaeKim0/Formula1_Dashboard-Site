import type { NextRacesResponse } from "@/lib/api/nextRacesApi/nextRacesApi";
export default function HeaderSection({
  upcomingRacesApi,
}: {
  upcomingRacesApi: NextRacesResponse;
}) {
  console.log(upcomingRacesApi);

  return (
    <div className="mb-4 flex min-w-0 justify-between gap-4 sm:mb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-extrabold tracking-tight text-gray-900 sm:text-xl">
            다가오는 레이스
          </h3>
          {/* 데이터가 없을 경우 */}
          {upcomingRacesApi === undefined ? (
            <p className="mt-1 text-xs font-medium text-gray-600 sm:text-sm">
              레이스 일정을 불러오지 못했거나 아직 없어요.
            </p>
          ) : (
            <p className="mt-1 break-words text-xs font-medium text-gray-600 sm:text-sm">
              {upcomingRacesApi?.race[0].circuit.city} ·{" "}
              {upcomingRacesApi?.race[0].circuit.country} 그랑프리
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
