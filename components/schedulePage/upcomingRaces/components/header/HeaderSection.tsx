import type { NextRacesResponse } from "@/lib/api/nextRacesApi/nextRacesApi";
export default function HeaderSection({
  upcomingRacesApi,
}: {
  upcomingRacesApi: NextRacesResponse;
}) {

  return (
    <div className="mb-4 flex min-w-0 justify-between gap-4 sm:mb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-asphalt sm:text-2xl">
            다가오는 레이스
          </h2>
          {/* 데이터가 없을 경우 */}
          {upcomingRacesApi === undefined ? (
            <p className="mt-1 text-sm text-muted">
              레이스 일정을 불러오지 못했거나 아직 없어요.
            </p>
          ) : (
            <p className="mt-1 break-words text-sm text-muted">
              {upcomingRacesApi?.race[0].circuit.city},{" "}
              {upcomingRacesApi?.race[0].circuit.country}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
