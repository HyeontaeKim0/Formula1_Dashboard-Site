import type { PodiumDriver } from "@/lib/types/types";
import { fetchLastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";
import type { LastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";
import { fetchLastRaceResult } from "@/lib/api/lastResults/lastRaceResultApi/lastRaceResult";

import {
  getCar,
  getTeamColor,
  getTeamLogoUrl,
  getDriverHeadshotUrl,
} from "@/lib/utils/driverUtils";
import DriverCardSlider from "@/components/resultsPage/podiumSection/components/DriverCardSlider";
import PodiumStage from "@/components/resultsPage/podiumSection/components/PodiumStage";

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
      driverNumber,
      team: driver.team?.teamName || "",
      teamColor: getTeamColor(driverNumber),
      imageUrl: getDriverHeadshotUrl(driverNumber),
      teamLogoUrl: getTeamLogoUrl(driverNumber),
      carImageUrl: getCar(driverNumber),
    };
  });
}

function isUaeChampionSeason(meeting: LastestMeeting | null) {
  return (
    meeting?.winner !== null &&
    meeting?.circuit?.country === "United Arab Emirates" &&
    meeting?.season === new Date().getFullYear()
  );
}

export default async function PodiumNew() {
  const [meeting, raceResult] = await Promise.all([
    fetchLastestMeeting(),
    fetchLastRaceResult(),
  ]);
  const podiumData = buildPodiumData(raceResult);
  // 일정 취소·챔피언 시즌·데이터 없음은 기존 슬라이더 컴포넌트가 안내 화면을 맡는다
  const isNormal =
    podiumData.length > 0 &&
    !(meeting != null && meeting.winner === null) &&
    !isUaeChampionSeason(meeting);
  if (isNormal) {
    return <PodiumStage podiumData={podiumData} />;
  }
  return (
    <div className="relative w-full">
      {/* <PodiumHeader lastestMeeting={meeting} isLoading={false} /> */}
      <DriverCardSlider lastestMeeting={meeting} podiumData={podiumData} />
    </div>
  );
}
