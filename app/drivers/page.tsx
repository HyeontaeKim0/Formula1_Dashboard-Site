import DriversSection from "@/components/driverSection/DriversSection";
import { getDriversFromOpenF1, transformOpenF1Driver } from "@/lib/openf1";

export default async function DriversPage() {
  // OpenF1 API에서 드라이버 데이터 가져오기
  const openF1Drivers = await getDriversFromOpenF1("latest");

  // OpenF1 데이터를 앱 형식으로 변환
  // 실제 순위, 포인트, 승수, 포디움 데이터는 별도 API가 필요하므로
  // 여기서는 드라이버 번호 순으로 정렬하여 위치를 대략적으로 설정
  const transformedDrivers = openF1Drivers
    .sort((a, b) => a.driver_number - b.driver_number)
    .map((driver, index) => transformOpenF1Driver(driver, index + 1, 0, 0, 0));

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <DriversSection drivers={transformedDrivers} />
    </div>
  );
}
