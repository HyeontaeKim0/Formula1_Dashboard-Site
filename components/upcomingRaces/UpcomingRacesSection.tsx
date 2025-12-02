"use client";
import { useState, useEffect } from "react";
import { getNextRaces } from "@/lib/api/nextRacesApi/nextRacesApi";
import type { NextRacesResponse } from "@/lib/api/nextRacesApi/nextRacesApi";
import UpcomingRacesType from "./upcomingRacesType/UpcomingRacesType";
import CircuitSection from "./components/circuit/CircuitSection";
import HeaderSection from "./components/header/HeaderSection";
export default function UpcomingRacesSection() {
  const [upcomingRacesApi, setUpcomingRacesApi] = useState<
    NextRacesResponse | undefined
  >(undefined);

  useEffect(() => {
    const fetchNextRaces = async () => {
      try {
        const nextRaces = await getNextRaces();

        setUpcomingRacesApi(nextRaces);
      } catch (error) {
        console.error("Failed to fetch next races:", error);
      }
    };
    fetchNextRaces();
  }, []);

  return (
    <div>
      <HeaderSection upcomingRacesApi={upcomingRacesApi as NextRacesResponse} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-10">
        <div
          className="lg:col-span-2 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <UpcomingRacesType
            upcomingRacesApi={upcomingRacesApi as NextRacesResponse}
          />
        </div>
        <div
          className="animate-slide-in-right"
          style={{ animationDelay: "0.2s" }}
        >
          <CircuitSection
            upcomingRacesApi={upcomingRacesApi as NextRacesResponse}
          />
        </div>
      </div>
    </div>
  );
}
