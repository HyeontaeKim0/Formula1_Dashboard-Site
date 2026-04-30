"use client";

import UpcomingRacesType from "@/components/homePage/upcomingRaces/upcomingRacesType/UpcomingRacesType";
import RaceResults from "@/components/homePage/raceResults/RaceResults";
import ChampionshipStandings from "@/components/homePage/championshipStandings/ChampionshipStandings";
import NewsSection from "@/components/common/newsSection/NewsSection";
import Podium from "@/components/homePage/podiumSection/Podium";
import PodiumNew from "@/components/homePage/podiumSection/PodiumNew";
import CircuitSection from "@/components/homePage/upcomingRaces/components/circuit/CircuitSection";
import UpcomingRacesSection from "@/components/homePage/upcomingRaces/UpcomingRacesSection";

export default function Home() {
  return (
    <div className="container mx-auto min-w-0 px-3 py-4 animate-fade-in sm:px-4 sm:py-8">
      {/* Podium Section */}
      <div className="mb-4 animate-slide-up sm:mb-8">
        {/* <Podium /> */}
        <PodiumNew />
      </div>

     
      {/* 다가오는 레이스 섹션 */}
      <UpcomingRacesSection />

      {/* 최근 레이스 결과 섹션 */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-2">
        <div
          className="animate-slide-in-left mt-6 sm:mt-10"
          style={{ animationDelay: "0.3s" }}
        >
          <RaceResults />
        </div>
        <div
          className="animate-slide-in-right mt-6 sm:mt-10"
          style={{ animationDelay: "0.4s" }}
        >
          <ChampionshipStandings />
        </div>
      </div>
    </div>
  );
}
