"use client";
import { useState, useEffect } from "react";
import { getNextRaces } from "@/lib/api/nextRacesApi/nextRacesApi";
import type {
  NextRacesResponse,
  SeasonScheduleResponse,
} from "@/lib/api/nextRacesApi/nextRacesApi";
import UpcomingRacesType from "./upcomingRacesType/UpcomingRacesType";
import HeaderSection from "./components/header/HeaderSection";
import { getSeasonSchedule } from "@/lib/api/nextRacesApi/nextRacesApi";
import AllSeasonSchedules from "@/components/schedulePage/allSeason/AllSeasonSchedules";
export default function UpcomingRacesSection() {
  const [upcomingRacesApi, setUpcomingRacesApi] = useState<
    NextRacesResponse | undefined
  >(undefined);
  const [seasonSchedule, setSeasonSchedule] = useState<
    SeasonScheduleResponse | undefined
  >(undefined);
  useEffect(() => {
    const fetchNextRaces = async () => {
      try {
        const nextRaces = await getNextRaces();
        const seasonSchedule = await getSeasonSchedule();
        setUpcomingRacesApi(nextRaces);
        setSeasonSchedule(seasonSchedule);
      } catch (error) {
        console.error("Failed to fetch next races:", error);
      }
    };
    fetchNextRaces();
  }, []);

  return (
    <div>
      <HeaderSection upcomingRacesApi={upcomingRacesApi as NextRacesResponse} />
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:mb-6 sm:mt-4 sm:gap-6 lg:grid-cols-3 lg:gap-6">
        <div
          className="lg:col-span-2 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <UpcomingRacesType
            upcomingRacesApi={upcomingRacesApi as NextRacesResponse}
          />
        </div>
        {/* 다음다음레이스 섹션 */}
        <div
          className="lg:col-span-1 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <UpcomingRacesType
            upcomingRacesApi={upcomingRacesApi as NextRacesResponse}
          />
        </div>
      </div>
      <div className="mt-8">
        {seasonSchedule && (
          <AllSeasonSchedules seasonSchedule={seasonSchedule} />
        )}
      </div>
    </div>
  );
}
