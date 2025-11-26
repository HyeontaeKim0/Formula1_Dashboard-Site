"use client";

import UpcomingRaces from "@/components/upcomingRaces/UpcomingRaces";
import RaceResults from "@/components/raceResults/RaceResults";
import ChampionshipStandings from "@/components/championshipStandings/ChampionshipStandings";
import NewsSection from "@/components/newsSection/NewsSection";
import Podium from "@/components/podiumSection/Podium";
import PodiumNew from "@/components/podiumSection/PodiumNew";
import CircuitSection from "@/components/circuitSection/CircuitSection";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Podium Section */}
      <div className="mb-8 animate-slide-up">
        {/* <Podium /> */}
        <PodiumNew />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div
          className="lg:col-span-2 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <UpcomingRaces />
        </div>
        <div
          className="animate-slide-in-right"
          style={{ animationDelay: "0.2s" }}
        >
          <CircuitSection />
        </div>
      </div>

      {/* Results and Standings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          className="animate-slide-in-left mt-10"
          style={{ animationDelay: "0.3s" }}
        >
          <RaceResults />
        </div>
        <div
          className="animate-slide-in-right mt-10"
          style={{ animationDelay: "0.4s" }}
        >
          <ChampionshipStandings />
        </div>
      </div>
    </div>
  );
}
