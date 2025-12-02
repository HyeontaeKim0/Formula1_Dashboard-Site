"use client";

import { Calendar, Clock, Flag, Play } from "lucide-react";
import { useState, useEffect } from "react";

import type { NextRacesResponse } from "@/lib/api/nextRacesApi/nextRacesApi";

import RaceTypeList from "../components/raceType/RaceTypeList";

import type { RaceEvent } from "@/lib/types/types";
import HeaderSection from "../components/header/HeaderSection";

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

export default function UpcomingRacesType({
  upcomingRacesApi,
}: {
  upcomingRacesApi: NextRacesResponse;
}) {
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

  return (
    <div>
      <div className="relative w-full">
        {/* 헤더 섹션 */}

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
    </div>
  );
}
