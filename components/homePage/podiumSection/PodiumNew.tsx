"use client";

import { Trophy } from "lucide-react";
import type { DriverStandingPodium, PodiumDriver } from "@/lib/types/types";
import { useEffect, useState } from "react";
import type { NextRacesResponse } from "@/lib/api/nextRacesApi/nextRacesApi";
// import { getSessionResults } from "@/lib/api/sessionResultApi/sessionResultApi";

import { getLastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";
import { getLastRaceResult } from "@/lib/api/lastResults/lastRaceResultApi/lastRaceResult";

import type { LastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";

import { getNextRaces } from "@/lib/api/nextRacesApi/nextRacesApi";
import NotFound from "@/components/common/notFound/NotFound";
import {
  getCar,
  getDriverName,
  getTeamName,
  getTeamColor,
  getTeamLogoUrl,
  getDriverImageUrl,
} from "@/lib/utils/driverUtils";
import DriverCardSlider from "@/components/homePage/podiumSection/components/DriverCardSlider";

export default function Podium() {
  const [driverStandingPodium, setDriverStandingPodium] = useState<
    DriverStandingPodium[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRaceResult, setLastRaceResult] = useState<any | null>(null);
  // 최근레이스, fastestLap,,,기타등등
  const [lastestMeeting, setLastestMeeting] = useState<LastestMeeting | null>(
    null,
  );

  const podiumDrivers =
    lastRaceResult?.races?.results?.slice(0, 3) ||
    lastRaceResult?.slice(0, 3) ||
    [];

  console.log("lastRaceResult", lastRaceResult);

  const [upcomingRacesApi, setUpcomingRacesApi] = useState<
    NextRacesResponse | undefined
  >(undefined);

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

  // 최근 레이스 데이터
  useEffect(() => {
    const fetchLastestMeeting = async () => {
      const lastestMeeting = await getLastestMeeting();

      setLastestMeeting(lastestMeeting);
    };
    fetchLastestMeeting();
  }, []);

  useEffect(() => {
    const fetchLastRaceResult = async () => {
      const lastRaceResult = await getLastRaceResult();
      setLastRaceResult(lastRaceResult);
      setIsLoading(false);
    };
    fetchLastRaceResult();
  }, []);

  // 최근 포디움 드라이버 데이터
  // useEffect(() => {
  //   const fetchSessionResults = async () => {
  //     setIsLoading(true);
  //     try {
  //       const sessionResults = await getSessionResults();

  //       setDriverStandingPodium(
  //         sessionResults.map((result) => ({
  //           position: result.position,
  //           driver_number: result.driver_number,
  //         }))
  //       );
  //     } catch (error) {
  //       console.error("세션 결과를 불러오지 못했습니다.", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchSessionResults();
  // }, []);

  // 포디움 순서대로 정렬 (1위, 2위, 3위) - position 기준으로 정렬
  const orderedDrivers = podiumDrivers
    .slice()
    .sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
    .slice(0, 3);

  const podiumData: PodiumDriver[] = orderedDrivers.map((driver: any) => {
    const driverNumber =
      driver.driver?.number || driver.driver_number || driver.number;
    return {
      position: driver.position,
      driverName: getDriverName(driverNumber),
      driverCode: driver.driver?.shortName || driverNumber?.toString() || "",
      team: getTeamName(driverNumber),
      teamColor: getTeamColor(driverNumber),
      imageUrl: getDriverImageUrl(driverNumber),
      teamLogoUrl: getTeamLogoUrl(driverNumber),
      carImageUrl: getCar(driverNumber),
    };
  });

  // 로딩 화면
  if (isLoading) {
    return (
      <div className="relative w-full">
        {/* 헤더 섹션 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center backdrop-blur-sm">
              <Trophy className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                최근 레이스
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-400">
                데이터 로딩 중...
              </p>
            </div>
          </div>
        </div>

        {/* 로딩 컨테이너 */}
        <div className="relative overflow-hidden rounded-3xl p-0">
          <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-20">
            {/* 로딩 스피너 */}
            <div className="relative">
              <NotFound text="데이터 로딩 중..." type="loading" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* 헤더 섹션 */}
      <div className="mb-6 flex items-center justify-between">
        {lastestMeeting?.winner === null ? (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center backdrop-blur-sm">
              <Trophy className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-600">
                최근 레이스
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-600">
                일정 취소 또는 캘린더 제외 — 포디움 데이터 없음
              </p>
            </div>
          </div>
        ) : lastestMeeting?.circuit?.country === "United Arab Emirates" &&
          lastestMeeting?.season === new Date().getFullYear() ? (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center backdrop-blur-sm">
              <Trophy className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-600">
                월드 챔피언 {lastestMeeting?.season}
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {lastestMeeting?.circuit?.country} ·{" "}
                {lastestMeeting?.circuit?.city}· Final Grand Prix
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center backdrop-blur-sm">
              <Trophy className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-600">
                최근 레이스
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {lastestMeeting?.circuit?.country
                  ? `${lastestMeeting.circuit.country} · ${lastestMeeting.circuit.city} 그랑프리`
                  : "레이스 정보 로딩 중..."}
              </p>
            </div>
          </div>
        )}
      </div>

      <DriverCardSlider
        lastestMeeting={lastestMeeting}
        podiumData={podiumData}
      />
    </div>
  );
}
