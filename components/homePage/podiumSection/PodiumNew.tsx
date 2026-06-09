"use client";

import { useEffect, useState } from "react";
import type { PodiumDriver } from "@/lib/types/types";
import { getLastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";
import type { LastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";
import { getLastRaceResult } from "@/lib/api/lastResults/lastRaceResultApi/lastRaceResult";
import NotFound from "@/components/common/notFound/NotFound";
import {
  getCar,
  getTeamColor,
  getTeamLogoUrl,
  getDriverImageUrl,
} from "@/lib/utils/driverUtils";
import DriverCardSlider from "@/components/homePage/podiumSection/components/DriverCardSlider";
import PodiumHeader from "@/components/homePage/podiumSection/components/PodiumHeader";

function resolveDriverName(driver: any, driverNumber: number | string | undefined): string {
  const apiDriver = driver.driver;
  const fullName = [apiDriver?.name, apiDriver?.surname]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (fullName) return fullName;
  if (apiDriver?.shortName) return apiDriver.shortName;
  if (driverNumber != null) return String(driverNumber);
  return "";
}

function buildPodiumData(lastRaceResult: any): PodiumDriver[] {
  const podiumDrivers =
    lastRaceResult?.races?.results?.slice(0, 3) ||
    lastRaceResult?.slice(0, 3) ||
    [];

  const orderedDrivers = podiumDrivers
    .slice()
    .sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
    .slice(0, 3);

  return orderedDrivers.map((driver: any) => {
    const driverNumber =
      driver.driver?.number || driver.driver_number || driver.number;

    return {
      position: driver.position,
      driverName: resolveDriverName(driver, driverNumber),
      driverCode: driver.driver?.shortName || driverNumber?.toString() || "",
      team: driver.team?.teamName || "",
      teamColor: getTeamColor(driverNumber),
      imageUrl: getDriverImageUrl(driverNumber),
      teamLogoUrl: getTeamLogoUrl(driverNumber),
      carImageUrl: getCar(driverNumber),
    };
  });
}

export default function PodiumNew() {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRaceResult, setLastRaceResult] = useState<any | null>(null);
  const [lastestMeeting, setLastestMeeting] = useState<LastestMeeting | null>(
    null,
  );

  useEffect(() => {
    const fetchPodiumData = async () => {
      setIsLoading(true);
      try {
        const [meeting, raceResult] = await Promise.all([
          getLastestMeeting(),
          getLastRaceResult(),
        ]);
        setLastestMeeting(meeting);
        setLastRaceResult(raceResult);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodiumData();
  }, []);

  const podiumData = buildPodiumData(lastRaceResult);

  if (isLoading) {
    return (
      <div className="relative w-full">
        <PodiumHeader lastestMeeting={null} isLoading />
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg sm:rounded-3xl">
          <div className="flex min-h-[280px] items-center justify-center px-4 py-8 sm:min-h-[360px]">
            <NotFound text="포디움 데이터 로딩 중..." type="loading" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <PodiumHeader lastestMeeting={lastestMeeting} isLoading={false} />
      <DriverCardSlider
        lastestMeeting={lastestMeeting}
        podiumData={podiumData}
      />
    </div>
  );
}
