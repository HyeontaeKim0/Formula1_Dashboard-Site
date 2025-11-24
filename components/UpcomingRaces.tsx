"use client";

import { Calendar, Clock, Flag, Play } from "lucide-react";
import { useState, useEffect } from "react";

import { getNextRaces } from "@/lib/nextRacesApi";
import type {
  NextRacesResponse,
  NextRaceItem,
  Schedule,
} from "@/lib/nextRacesApi";

import { GiF1Car } from "react-icons/gi";

import type { RaceEvent } from "@/lib/types/types";

const getTypeColor = (type: RaceEvent["type"]) => {
  switch (type) {
    case "race":
      return "from-primary to-primary-dark";
    case "qualifying":
      return "from-secondary to-secondary";
    case "sprint":
      return "from-primary-light to-secondary";
    default:
      return "from-dark-lighter to-dark-light";
  }
};

const getTypeIcon = (type: RaceEvent["type"]) => {
  switch (type) {
    case "race":
      return <Flag className="text-primary" size={16} />;
    case "qualifying":
    case "sprint":
      return <Play className="text-secondary" size={16} />;
    default:
      return <Calendar className="text-gray-400" size={16} />;
  }
};

export default function UpcomingRaces() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingRacesApi, setUpcomingRacesApi] =
    useState<NextRacesResponse | null>(null);

  const upcomingRaces: RaceEvent[] | undefined = upcomingRacesApi?.race.map(
    (race: any) => ({
      name: race.name,
      date: race.schedule?.fp1?.date,
      time: race.schedule?.fp1?.time,
      daysUntil: 3,
      type: "fp1",
    })
  );

  console.log("upcomingRacesApi", upcomingRacesApi?.race[0].schedule);

  // 목데이터

  // const upcomingRaces: NextRaceItem[] =
  //   upcomingRacesApi?.race.map((race: NextRaceItem) => ({
  //     raceId: race.raceId,
  //     raceName: race.raceName,
  //     circuit: race.circuit,
  //     schedule: race.schedule,
  //     country: race.country,
  //   })) || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchNextRaces = async () => {
      try {
        const nextRaces = await getNextRaces();

        setUpcomingRacesApi(nextRaces);
      } catch (error) {
        console.error("Failed to fetch next races:", error);
      }
    };
    fetchNextRaces();
  }, []);

  return (
    <div className="relative w-full">
      {/* 헤더 섹션 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
            <Calendar className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
              다가오는 레이스
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-600">
              {upcomingRaces?.[0].name}
            </p>
          </div>
        </div>
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

      {/* 메인 컨텐츠 */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
        <div className="space-y-3">
          {upcomingRaces?.map((race, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-md"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer"></div>

              <div className="relative p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div
                    className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl  shadow-lg border border-white/10 relative overflow-hidden`}
                    style={{
                      backgroundColor: race.date ? "green" : "red",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="text-xs font-extrabold text-white mb-0.5">
                        D-
                      </span>
                      <span className="text-[10px] text-white/80 font-medium">
                        일 후
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {getTypeIcon(race.type as RaceEvent["type"])}
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                        {race.date}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">{race.time}</p>
                  </div>
                </div>
                <div className="ml-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <GiF1Car size={40} className="text-primary scale-x-[-1]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-gray-200">
          <button className="w-full py-3.5 text-sm font-semibold text-gray-700 hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-gray-200 hover:border-primary bg-gradient-to-r from-gray-50 to-white hover:from-primary hover:to-primary-dark group">
            <span className="flex items-center justify-center space-x-2">
              <span>전체 일정 보기</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
