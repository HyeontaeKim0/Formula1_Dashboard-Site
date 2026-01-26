import { getDriverResultChartData } from "@/lib/api/driverResultChartData/driverResultChartData";
import { getCurrentDriverChampion } from "@/lib/api/currentDriverChampion/CurrentDriverChampion";
import { getLastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";
import { getLastQualifyResult } from "@/lib/api/lastResults/lastQualifyApi/lastQualifyApi";
import DriverRankChart from "@/components/driverChart/DriverRankChart";
import { getTeamColor, getTeamName, getDriverName, getTeamLogoUrl } from "@/lib/utils/driverUtils";
import Image from "next/image";

type ChartDataPoint = {
  driverNumber: number;
  top3Count: number;
  winnerCount: number;
  round: number;
  position: number | string;
  roundLabel: string;
  positionLabel: string;
  points: number;
  team: string;
};

export default async function DriverChartPage(props: {
  searchParams: Promise<{ driverCode: string }>;
}) {
  const { driverCode } = await props.searchParams;

  const year = 2025;
  const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  
  // Promise.all을 사용하여 모든 라운드 데이터를 병렬로 호출
  const [driverResultChartDataList, driverChampionship, lastestMeeting, lastQualify] = await Promise.all([
    Promise.all(rounds.map((round) => getDriverResultChartData(year, round))),
    getCurrentDriverChampion(),
    getLastestMeeting(),
    getLastQualifyResult(),
  ]);

  // 차트용 데이터 가공: 각 라운드에서 해당 드라이버의 순위 추출
  const chartData: ChartDataPoint[] = rounds
    .map((round, index): ChartDataPoint | null => {
      const roundData = driverResultChartDataList[index];
      if (!roundData || roundData.length === 0) return null;
      
      const driver = roundData.find(
        (item) => item.driver.shortName === driverCode
      );
      
      if (!driver) return null;
      
      return {
        driverNumber: driver.driver.number,
        top3Count: 0, // 아래에서 계산
        winnerCount: 0, // 아래에서 계산
        round,
        position: driver.position,
        roundLabel: `${round}R`,
        positionLabel: typeof driver.position === "string" 
          ? driver.position 
          : `${driver.position}위`,
        points: driver.points,
        team: driver.team.teamName,
      };
    })
    .filter((item): item is ChartDataPoint => item !== null);

  // 통계 계산
  const top3Count = driverResultChartDataList
    .map((roundData) => {
      const d = roundData?.find(
        (item) => item.driver.shortName === driverCode
      );
      return typeof d?.position === "number" && d.position < 4 ? 1 : 0;
    })
    .reduce((acc: number, curr: number) => acc + curr, 0);

  const winnerCount = driverResultChartDataList
    .map((roundData) => {
      const d = roundData?.find(
        (item) => item.driver.shortName === driverCode
      );
      return typeof d?.position === "number" && d.position === 1 ? 1 : 0;
    })
    .reduce((acc: number, curr: number) => acc + curr, 0);

  // 총 포인트 계산
  const totalPoints = chartData.reduce((sum, d) => sum + d.points, 0);

  // 순위 통계 계산
  const numericPositions = chartData
    .map((d) => d.position)
    .filter((p): p is number => typeof p === "number");
  
  const bestPosition = numericPositions.length > 0 ? Math.min(...numericPositions) : null;
  const worstPosition = numericPositions.length > 0 ? Math.max(...numericPositions) : null;
  const averagePosition = numericPositions.length > 0 
    ? Math.round((numericPositions.reduce((a, b) => a + b, 0) / numericPositions.length) * 10) / 10
    : null;

  // 챔피언십 정보
  const championshipInfo = driverChampionship?.find(
    (d) => d.driver.shortName === driverCode
  );

  // 최근 레이스 정보
  const lastRaceInfo = lastestMeeting?.winner?.shortName === driverCode 
    ? { raceName: lastestMeeting.raceName, position: 1 }
    : chartData.length > 0 
      ? { raceName: lastestMeeting?.raceName || "", position: chartData[chartData.length - 1]?.position }
      : null;

  // 최근 퀄리파잉 정보
  const lastQualifyInfo = lastQualify?.qualyResults?.find(
    (q) => q.driver.shortName === driverCode
  );

  const driverNumber = chartData[0]?.driverNumber || 0;
  const driverName = getDriverName(driverNumber);
  const teamName = chartData[0] ? getTeamName(driverNumber) : "";
  const teamColor = getTeamColor(driverNumber);
  const teamLogoUrl = getTeamLogoUrl(driverNumber);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 드라이버 헤더 정보 */}
        {chartData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-6">
              {teamLogoUrl && (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={teamLogoUrl}
                    alt={teamName}
                    fill
                    className="object-contain"
                    sizes="64px"
                    unoptimized
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {driverName}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="font-mono text-lg">{driverCode}</span>
                  <span className="text-gray-400">|</span>
                  <span>{teamName}</span>
                  {championshipInfo ? (
                    <>
                      <span className="text-gray-400">|</span>
                      <span className="font-semibold">
                        챔피언십 {championshipInfo.position}위
                      </span>
                    </>
                  ) : <>
                  <span className="text-gray-400">|</span>
                  <span className="font-semibold">
                    챔피언십 진행중
                  </span>
                  </>}
                </div>
              </div>
              {championshipInfo && (
                <div className="text-right">
                  <div className="text-3xl font-bold" style={{ color: teamColor }}>
                    {championshipInfo.points}
                  </div>
                  <div className="text-sm text-gray-500">포인트</div>
                </div>
              )}
            </div>
            <div 
              className="w-full h-2 rounded-full mt-4"
              style={{ backgroundColor: teamColor }}
            />
          </div>
        )}

        {/* 통계 카드 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* 총 포인트 */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-1">총 포인트</div>
            <div className="text-2xl font-bold text-gray-900">{totalPoints}</div>
          </div>

          {/* 우승 횟수 */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-1">우승 횟수</div>
            <div className="text-2xl font-bold text-yellow-600">{winnerCount}</div>
          </div>

          {/* 포디움 횟수 */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-1">포디움 횟수</div>
            <div className="text-2xl font-bold text-amber-600">{top3Count}</div>
          </div>

          {/* 참가 레이스 수 */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-1">참가 레이스</div>
            <div className="text-2xl font-bold text-gray-900">{chartData.length}</div>
          </div>
        </div>

        {/* 순위 통계 카드 */}
        {(bestPosition || worstPosition || averagePosition) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bestPosition && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">최고 순위</div>
                <div className="text-2xl font-bold text-green-600">{bestPosition}위</div>
              </div>
            )}
            {worstPosition && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">최저 순위</div>
                <div className="text-2xl font-bold text-red-600">{worstPosition}위</div>
              </div>
            )}
            {averagePosition && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">평균 순위</div>
                <div className="text-2xl font-bold text-gray-900">{averagePosition}위</div>
              </div>
            )}
          </div>
        )}

        

        {/* 차트 */}
        <DriverRankChart 
          data={chartData} 
          driverCode={driverCode} 
          driverNumber={driverNumber} 
          top3Count={top3Count}
          winnerCount={winnerCount}
        />
      </div>
    </div>
  );
}