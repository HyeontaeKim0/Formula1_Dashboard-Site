import DriversSection from "@/components/homePage/driverSection/DriversSection";
import { getDriversFromOpenF1, transformOpenF1Driver } from "@/lib/openf1";

export const dynamic = "force-dynamic";

export default async function DriversPage() {
  const openF1Drivers = await getDriversFromOpenF1("latest");

  const transformedDrivers = openF1Drivers
    .sort((a, b) => a.driver_number - b.driver_number)
    .map((driver, index) => transformOpenF1Driver(driver, index + 1, 0, 0, 0));

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <DriversSection drivers={transformedDrivers} />
    </div>
  );
}
