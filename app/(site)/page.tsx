"use client";

import RaceResults from "@/components/homePage/raceResults/RaceResults";
import PodiumNew from "@/components/homePage/podiumSection/PodiumNew";
import UpcomingRaceLink from "@/components/homePage/upcomingRaces/UpcomingRaceLink";
import NewsSection from "@/components/common/newsSection/NewsSection";

export default function Home() {
  return (
    <div className="container mx-auto min-w-0 px-3 py-1 animate-fade-in sm:px-4 sm:py-2 md:py-2 lg:px-4 lg:py-2">
      <UpcomingRaceLink />

      <div className="animate-slide-up mt-[40px] sm:mb-8">
        <PodiumNew />
      </div>

      <div className="mt-[80px] min-w-0 animate-slide-in-left">
        <RaceResults />
      </div>

      <div
        id="news"
        className="mt-[80px] min-w-0 scroll-mt-20 animate-fade-in sm:px-[1%]"
      >
        {/* <NewsSection /> */}
      </div>
    </div>
  );
}
