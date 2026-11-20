import type { PodiumDriver } from "@/lib/types/types";
import { getLastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";
import type { LastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";
import { getLastRaceResult } from "@/lib/api/lastResults/lastRaceResultApi/lastRaceResult";

import {
  getCar,
  getTeamColor,
  getTeamLogoUrl,
  getDriverImageUrl,
} from "@/lib/utils/driverUtils";
import DriverCardSlider from "@/components/homePage/podiumSection/components/DriverCardSlider";
import PodiumHeader from "@/components/homePage/podiumSection/components/PodiumHeader";

function buildPodiumData(lastRaceResult: any): PodiumDriver[] {
  const podiumDrivers =
    lastRaceResult?.races?.results?.slice(0, 3) ||
    lastRaceResult?.slice(0, 3) ||
    [];

  // 포디엄 드라이버 순서 정렬 (1위, 2위, 3위) 내림차순 정렬
  const orderedDrivers = podiumDrivers
    .slice()
    .sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
    .slice(0, 3);

  return orderedDrivers.map((driver: any) => {
    const driverNumber =
      driver.driver?.number || driver.driver_number || driver.number;

    return {
      position: driver.position,
      driverName: driver.driver?.surname || "",
      driverCode: driver.driver?.shortName || driverNumber?.toString() || "",
      team: driver.team?.teamName || "",
      teamColor: getTeamColor(driverNumber),
      imageUrl: getDriverImageUrl(driverNumber),
      teamLogoUrl: getTeamLogoUrl(driverNumber),
      carImageUrl: getCar(driverNumber),
    };
  });
}

export default async function PodiumNew() {
  const [meeting, raceResult] = await Promise.all([
    getLastestMeeting(),
    getLastRaceResult(),
  ]);
  const podiumData = buildPodiumData(raceResult);
  return (
    <div className="relative w-full">
      <PodiumHeader lastestMeeting={meeting} isLoading={false} />
      <DriverCardSlider lastestMeeting={meeting} podiumData={podiumData} />
    </div>
  );
}
