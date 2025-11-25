"use client";

import { Calendar, Clock, Flag, Play } from "lucide-react";
import { useState, useEffect } from "react";

import { getNextRaces } from "@/lib/nextRacesApi";
import type { NextRacesResponse } from "@/lib/nextRacesApi";

import RaceTypeList from "./components/raceType/RaceTypeList";

import type { RaceEvent } from "@/lib/types/types";

const getTypeColor = (type: RaceEvent["type"]) => {
  switch (type) {
    case "race":
      return "from-primary to-primary-dark";
    case "qualifying":
      return "from-secondary to-secondary";
    case "sprint":
      return "from-primary-light to-secondary";
    default:
      return "from-dark-lighter to-dark-light";
  }
};

const getTypeIcon = (type: RaceEvent["type"]) => {
  switch (type) {
    case "race":
      return <Flag className="text-primary" size={16} />;
    case "qualifying":
    case "sprintRace":
      return <Play className="text-secondary" size={16} />;
    default:
      return <Calendar className="text-gray-400" size={16} />;
  }
};

export default function UpcomingRaces() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingRacesApi, setUpcomingRacesApi] =
    useState<NextRacesResponse | null>(null);

  console.log("upcomingRacesApi", upcomingRacesApi?.race[0].circuit.country);
  console.log("upcomingRacesApi", upcomingRacesApi?.race[0].circuit.city);

  const freePractice1: RaceEvent[] =
    upcomingRacesApi?.race.map((race: any) => ({
      name: race.name,
      date: race.schedule?.fp1?.date,
      time: race.schedule?.fp1?.time,
      daysUntil: 3,
      type: "fp1",
    })) || [];

  const freePractice2: RaceEvent[] =
    upcomingRacesApi?.race.map((race: any) => ({
      name: race.name,
      date: race.schedule?.fp2?.date,
      time: race.schedule?.fp2?.time,
      daysUntil: 3,
      type: "fp2",
    })) || [];

  const freePractice3: RaceEvent[] =
    upcomingRacesApi?.race.map((race: any) => ({
      name: race.name,
      date: race.schedule?.fp3?.date,
      time: race.schedule?.fp3?.time,
      daysUntil: 3,
      type: "fp3",
    })) || [];

  const qualifying: RaceEvent[] =
    upcomingRacesApi?.race.map((race: any) => ({
      name: race.name,
      date: race.schedule?.qualy?.date,
      time: race.schedule?.qualy?.time,
      daysUntil: 3,
      type: "qualy",
    })) || [];

  const sprint: RaceEvent[] =
    upcomingRacesApi?.race.map((race: any) => ({
      name: race.name,
      date: race.schedule?.sprintRace?.date,
      time: race.schedule?.sprintRace?.time,
      daysUntil: 3,
      type: "sprint",
    })) || [];

  const race: RaceEvent[] =
    upcomingRacesApi?.race.map((race: any) => ({
      name: race.name,
      date: race.schedule?.race?.date,
      time: race.schedule?.race?.time,
      daysUntil: 3,
      type: "race",
    })) || [];

  const sprintQualy: RaceEvent[] =
    upcomingRacesApi?.race.map((race: any) => ({
      name: race.name,
      date: race.schedule?.sprintQualy?.date,
      time: race.schedule?.sprintQualy?.time,
      daysUntil: 3,
      type: "sprintQualy",
    })) || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="relative w-full">
      {/* 헤더 섹션 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
            <Calendar className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
              다가오는 레이스
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-600">
              {upcomingRacesApi?.race[0].circuit.city} ·{" "}
              {upcomingRacesApi?.race[0].circuit.country} 그랑프리
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-xl border border-gray-200">
          <Clock size={14} />
          <span className="font-mono font-semibold">
            {currentTime.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <RaceTypeList
        freePractice1={freePractice1 || ([] as RaceEvent[])}
        freePractice2={freePractice2 || ([] as RaceEvent[])}
        freePractice3={freePractice3 || ([] as RaceEvent[])}
        qualifying={qualifying || ([] as RaceEvent[])}
        sprint={sprint || ([] as RaceEvent[])}
        race={race || ([] as RaceEvent[])}
        sprintQualy={sprintQualy || ([] as RaceEvent[])}
        getTypeIcon={getTypeIcon}
      />
    </div>
  );
}
