"use client";
import { useState, useEffect } from "react";
import type {
  NextRacesResponse,
  SeasonScheduleResponse,
} from "@/lib/api/nextRacesApi/nextRacesApi";
import UpcomingRacesType from "./upcomingRacesType/UpcomingRacesType";
import HeaderSection from "./components/header/HeaderSection";
import { getSeasonSchedule } from "@/lib/api/nextRacesApi/nextRacesApi";
import { findNextRace } from "@/lib/utils/scheduleUtils";
import AllSeasonSchedules from "@/components/schedulePage/allSeason/AllSeasonSchedules";
import NextNextRace from "./components/nextNextRace/NextNextRace";
import ScheduleSkeleton from "@/components/schedulePage/ScheduleSkeleton";
export default function UpcomingRacesSection() {
  const [seasonSchedule, setSeasonSchedule] = useState<
    SeasonScheduleResponse | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchNextRaces = async () => {
      try {
        setSeasonSchedule(await getSeasonSchedule());
      } catch (error) {
        console.error("Failed to fetch next races:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNextRaces();
  }, []);

  // 다음 레이스는 시즌 전체 목록에서 고른다 (API를 따로 부르지 않음)
  const nextRace = seasonSchedule && findNextRace(seasonSchedule.races);
  const upcomingRacesApi: NextRacesResponse | undefined =
    seasonSchedule && nextRace
      ? {
          season: seasonSchedule.season,
          round: Number(nextRace.raceId),
          race: [nextRace],
        }
      : undefined;

  if (isLoading) return <ScheduleSkeleton />;

  return (
    <div>
      <HeaderSection upcomingRacesApi={upcomingRacesApi as NextRacesResponse} />
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:mb-6 sm:mt-4 sm:gap-6 lg:grid-cols-3 lg:gap-6">
        <div
          className="lg:col-span-2"
        >
          <UpcomingRacesType
            upcomingRacesApi={upcomingRacesApi as NextRacesResponse}
          />
        </div>
        {/* 다음다음레이스 섹션 */}
        <div
          className="lg:col-span-1"
        >
          <NextNextRace
            seasonSchedule={seasonSchedule as SeasonScheduleResponse}
            upcomingRacesApi={upcomingRacesApi as NextRacesResponse}
          />
        </div>
      </div>
      <div className="mt-10">
        {seasonSchedule && (
          <AllSeasonSchedules seasonSchedule={seasonSchedule} />
        )}
      </div>
    </div>
  );
}
