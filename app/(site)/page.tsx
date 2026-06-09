"use client";

import RaceResults from "@/components/homePage/raceResults/RaceResults";
import ChampionshipStandings from "@/components/homePage/championshipStandings/ChampionshipStandings";
import PodiumNew from "@/components/homePage/podiumSection/PodiumNew";
import UpcomingRaceLink from "@/components/homePage/upcomingRaces/UpcomingRaceLink";

export default function Home() {
  return (
    <div className="container mx-auto min-w-0 px-3 py-3 animate-fade-in sm:px-4 sm:py-5 md:py-8 lg:px-4 lg:py-5">
      <UpcomingRaceLink />

      <div className="animate-slide-up mt-[40px] sm:mb-8">
        <PodiumNew />
      </div>

      <div className="mt-[80px] grid min-w-0 grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-2">
        <div className="animate-slide-in-left min-w-0">
          <RaceResults />
        </div>
        <div className="animate-slide-in-right min-w-0">
          <ChampionshipStandings />
        </div>
      </div>
    </div>
  );
}
