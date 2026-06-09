"use client";

import { useState, useEffect } from "react";
import { getLastRaceResult } from "@/lib/api/lastResults/lastRaceResultApi/lastRaceResult";
import { getLastQualifyResult } from "@/lib/api/lastResults/lastQualifyApi/lastQualifyApi";
import { getLastSprintRaceResult } from "@/lib/api/lastResults/lastSprintApi/LastSprintApi";
import {
  getLastPractice1Result,
  getLastPractice2Result,
  getLastPractice3Result,
} from "@/lib/api/lastResults/lastPracticeApi/lastPracticeApi";
import type { DriverResult } from "@/lib/types/types";
import {
  getDriverName,
  getTeamColor,
  getTeamName,
} from "@/lib/utils/driverUtils";
import RacingTypeTabMenu from "./components/RacingTypeTabMenu";
import HeaderSection from "./components/HeaderSection";
import DataTable from "./components/DataTable";

export default function RaceResults() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRaceResult, setLastRaceResult] = useState<any | null>(null);
  const [freePractice1Result, setFreePractice1Result] = useState<any | null>(
    null,
  );
  const [freePractice2Result, setFreePractice2Result] = useState<any | null>(
    null,
  );
  const [freePractice3Result, setFreePractice3Result] = useState<any | null>(
    null,
  );
  const [sprintResult, setSprintResult] = useState<any | null>(null);
  const [qualifyingResult, setQualifyingResult] = useState<any | null>(null);
  const [view, setView] = useState<
    "practice" | "sprint" | "qualifying" | "race"
  >("race");

  useEffect(() => {
    const fetchAllResults = async () => {
      setIsLoading(true);
      try {
        const [race, practice1, sprint, qualify] = await Promise.all([
          getLastRaceResult(),
          getLastPractice1Result(),
          getLastSprintRaceResult(),
          getLastQualifyResult(),
        ]);

        setLastRaceResult(race);
        setFreePractice1Result(practice1);
        setSprintResult(sprint);
        setQualifyingResult(qualify);

        if (!sprint) {
          const [practice2, practice3] = await Promise.all([
            getLastPractice2Result(),
            getLastPractice3Result(),
          ]);
          setFreePractice2Result(practice2);
          setFreePractice3Result(practice3);
        } else {
          setFreePractice2Result(null);
          setFreePractice3Result(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllResults();
  }, []);

  const parsePosition = (position: any, index: number): number => {
    if (typeof position === "number") return position;
    if (typeof position === "string") {
      const num = parseInt(position, 10);
      if (!isNaN(num)) return num;
      return 9999;
    }
    if (!position) return index + 1;
    return 9999;
  };

  const raceResults: DriverResult[] =
    lastRaceResult?.races?.results
      ?.map((result: any, index: number) => ({
        position: parsePosition(result.position, index),
        driverName: getDriverName(result.driver?.number) || "",
        driverCode: result.driver?.code || result.driver?.driverId || "",
        driverNumber: result.driver?.number || "",
        team: getTeamName(result.driver?.number) || "",
        time: result.time || result.duration || "",
        laps: result.laps || result.numberOfLaps || lastRaceResult?.laps || 0,
        points: result.points || 0,
        teamColor: getTeamColor(result.driver?.number) || "",
        originalPosition: result.position,
      }))
      .sort((a: any, b: any) => a.position - b.position) || [];

  const qualifyingResults: DriverResult[] =
    qualifyingResult?.races?.qualyResults
      ?.map((result: any, index: number) => ({
        position: parsePosition(result.gridPosition, index),
        driverName: getDriverName(result.driver?.number) || "",
        driverCode: result.driver?.code || result.driver?.driverId || "",
        driverNumber: result.driver?.number || "",
        team: getTeamName(result.driver?.number) || "",
        time: result.q1 || "",
        time2: result.q2 || "",
        time3: result.q3 || "",
        laps: result.laps || result.numberOfLaps || lastRaceResult?.laps || 0,
        points: result.points || 0,
        teamColor: getTeamColor(result.driver?.number) || "",
        originalPosition: result.position,
      }))
      .sort((a: any, b: any) => a.position - b.position) || [];

  const sprintResults: DriverResult[] =
    sprintResult?.races?.sprintRaceResults
      ?.map((result: any, index: number) => ({
        position: parsePosition(result.position, index),
        driverName: getDriverName(result.driver?.number) || "",
        driverCode: result.driver?.code || result.driver?.driverId || "",
        driverNumber: result.driver?.number || "",
        team: getTeamName(result.driver?.number) || "",
        time: result.time || "",
        laps: result.laps || result.numberOfLaps || lastRaceResult?.laps || 0,
        points: result.points || 0,
        teamColor: getTeamColor(result.driver?.number) || "",
        originalPosition: result.position,
      }))
      .sort((a: any, b: any) => a.position - b.position) || [];

  const practice1Results: DriverResult[] =
    freePractice1Result?.races?.fp1Results
      ?.map((result: any, index: number) => ({
        position: parsePosition(result.gridPosition, index),
        driverName: getDriverName(result.driver?.number) || "",
        driverCode: result.driver?.code || result.driver?.driverId || "",
        driverNumber: result.driver?.number || "",
        team: getTeamName(result.driver?.number) || "",
        time: result.time || "",
        laps: result.laps || result.numberOfLaps || lastRaceResult?.laps || 0,
        points: result.points || 0,
        teamColor: getTeamColor(result.driver?.number) || "",
        originalPosition: result.position,
      }))
      .sort((a: any, b: any) => a.position - b.position) || [];

  const practice2Results: DriverResult[] =
    freePractice2Result?.races?.fp2Results
      ?.map((result: any, index: number) => ({
        position: parsePosition(result.gridPosition, index),
        driverName: getDriverName(result.driver?.number) || "",
        driverCode: result.driver?.code || result.driver?.driverId || "",
        time: result.time || "",
        driverNumber: result.driver?.number || "",
        team: getTeamName(result.driver?.number) || "",
      }))
      .sort((a: any, b: any) => a.position - b.position) || [];

  const practice3Results: DriverResult[] =
    freePractice3Result?.races?.fp3Results
      ?.map((result: any, index: number) => ({
        position: parsePosition(result.gridPosition, index),
        driverName: getDriverName(result.driver?.number) || "",
        driverCode: result.driver?.code || result.driver?.driverId || "",
        time: result.time || "",
        driverNumber: result.driver?.number || "",
        team: getTeamName(result.driver?.number) || "",
      }))
      .sort((a: any, b: any) => a.position - b.position) || [];

  const practiceResults = practice1Results.map((result) => {
    const practice2Result =
      sprintResult === null
        ? practice2Results.find(
            (r) => r.driverNumber === result.driverNumber && r.time !== "",
          )
        : undefined;
    const practice3Result =
      sprintResult === null
        ? practice3Results.find(
            (r) => r.driverNumber === result.driverNumber && r.time !== "",
          )
        : undefined;
    return {
      ...result,
      time2: practice2Result?.time,
      time3: practice3Result?.time,
    };
  });

  const currentResults =
    view === "race"
      ? raceResults
      : view === "practice"
        ? practiceResults
        : view === "sprint"
          ? sprintResults
          : qualifyingResults;

  return (
    <div className="relative min-w-0 w-full scroll-mt-20" id="race-results">
      <div className="mb-3 flex min-w-0 flex-col gap-2 sm:mb-6 sm:gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="order-1 min-w-0 w-full lg:order-2 lg:w-auto lg:max-w-full lg:shrink-0">
          <RacingTypeTabMenu view={view} setView={setView} />
        </div>
        <div className="order-2 min-w-0 shrink-0 lg:order-1">
          <HeaderSection lastRaceResult={lastRaceResult} isLoading={isLoading} />
        </div>
      </div>
      <div className="relative min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-lg sm:rounded-3xl sm:p-4 md:p-6">
        <DataTable
          raceResults={currentResults}
          setHoveredRow={setHoveredRow}
          hoveredRow={hoveredRow}
          view={view}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
