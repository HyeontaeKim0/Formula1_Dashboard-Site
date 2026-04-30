import { Calendar, Clock } from "lucide-react";
import type { NextRacesResponse } from "@/lib/api/nextRacesApi/nextRacesApi";
import { useState, useEffect } from "react";
export default function HeaderSection({
  upcomingRacesApi,
}: {
  upcomingRacesApi: NextRacesResponse;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  console.log("upcomingRacesApi", upcomingRacesApi);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="mb-4 flex min-w-0 flex-col gap-4 sm:mb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
          <Calendar className="text-primary" size={24} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-extrabold tracking-tight text-gray-900 sm:text-xl">
            다가오는 레이스
          </h3>
          {/* 데이터가 없을 경우 */}
          {upcomingRacesApi === undefined ? (
            <p className="mt-1 text-xs font-medium text-gray-600 sm:text-sm">
              레이스 일정 데이터가 없습니다.
            </p>
          ) : (
            <p className="mt-1 break-words text-xs font-medium text-gray-600 sm:text-sm">
              {upcomingRacesApi?.race[0].circuit.city} ·{" "}
              {upcomingRacesApi?.race[0].circuit.country} 그랑프리
            </p>
          )}
        </div>
      </div>
      <div className="flex min-w-0 flex-wrap items-center gap-2 sm:justify-end">
        <span className="shrink-0 text-xs font-extrabold rounded-xl border border-primary/30 bg-primary/20 px-2.5 py-1 text-primary sm:px-3 sm:py-1.5">
          {upcomingRacesApi?.round} 라운드
        </span>
        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-gray-100 px-2.5 py-1.5 text-xs text-gray-600 sm:px-3 sm:py-2 sm:text-sm">
          <Clock size={14} />
          <span className="font-mono font-semibold">
            {currentTime.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
