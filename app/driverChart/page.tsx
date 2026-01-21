import { getDriverResultChartData } from "@/lib/api/driverResultChartData/driverResultChartData";
import DriverRankChart from "@/components/driverChart/DriverRankChart";

type ChartDataPoint = {
  driverNumber: number;
  round: number;
  position: number | string;
  roundLabel: string;
  positionLabel: string;
};

export default async function DriverChartPage(props: {
  searchParams: Promise<{ driverCode: string }>;
}) {
  const { driverCode } = await props.searchParams;

  const year = 2025;
  const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  
  // Promise.all을 사용하여 모든 라운드 데이터를 병렬로 호출
  const driverResultChartDataList = await Promise.all(
    rounds.map((round) => getDriverResultChartData(year, round))
  );

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
        round,
        position: driver.position,
        roundLabel: `${round}R`,
        positionLabel: typeof driver.position === "string" 
          ? driver.position 
          : `${driver.position}위`,
      };
    })
    .filter((item): item is ChartDataPoint => item !== null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <DriverRankChart 
          data={chartData} 
          driverCode={driverCode} 
          driverNumber={chartData[0]?.driverNumber || 0} 
        />
      </div>
    </div>
  );
}