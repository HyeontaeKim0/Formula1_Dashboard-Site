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
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm">
          <Calendar className="text-primary" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
            다가오는 레이스
          </h3>
          {/* 데이터가 없을 경우 */}
          {upcomingRacesApi === undefined ? (
            <p className="mt-1 text-sm font-medium text-gray-600">
              레이스 일정 데이터가 없습니다.
            </p>
          ) : (
            <p className="mt-1 text-sm font-medium text-gray-600">
              {upcomingRacesApi?.race[0].circuit.city} ·{" "}
              {upcomingRacesApi?.race[0].circuit.country} 그랑프리
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-extrabold px-3 py-1.5 bg-primary/20 text-primary rounded-xl border border-primary/30">
          {upcomingRacesApi?.round} 라운드
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-xl border border-gray-200">
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
