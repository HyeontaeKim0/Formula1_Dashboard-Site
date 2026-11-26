import RaceResults from "@/components/resultsPage/raceResults/RaceResults";
import PodiumNew from "@/components/resultsPage/podiumSection/PodiumNew";
import UpcomingRaceLink from "@/components/homePage/upcomingRaces/UpcomingRaceLink";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto min-w-0 px-3 py-1 sm:px-4 sm:py-2 md:py-2 lg:px-4 lg:py-2">
      <UpcomingRaceLink />

      <div className="mt-[40px] sm:mb-8">
        <Suspense fallback={<div>Loading...</div>}>
          <PodiumNew />
        </Suspense>
      </div>

      <div className="mt-[80px] min-w-0">
        <RaceResults />
      </div>
    </div>
  );
}
