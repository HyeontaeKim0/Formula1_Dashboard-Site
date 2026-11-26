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
import type { DriverResult, PodiumDriver } from "@/lib/types/types";

import {
  getDriverImageUrl,
  getDriverName,
  getTeamColor,
  getTeamName,
} from "@/lib/utils/driverUtils";
import RacingTypeTabMenu from "./components/RacingTypeTabMenu";

import DataTable from "./components/DataTable";
import PodiumStage from "../podiumSection/components/PodiumStage";

export default function RaceResults({
  showPodium = false,
}: {
  showPodium?: boolean;
}) {
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

  // 레이스 결과 배열 생성
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

  // 퀄리파이 결과 배열 생성
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

  // 스프린트 결과 배열 생성
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

  // FP1 결과
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

  // FP2 결과
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

  // FP3 결과
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

  // FP1이 비어 있어도 FP2·FP3 드라이버가 빠지지 않게, 세 세션을 번호로 합친다.
  // 해당 세션 기록이 없으면 칸은 "-"다.
  const practiceByNumber = new Map<string, DriverResult>();
  (
    [
      [practice1Results, "time"],
      [practice2Results, "time2"],
      [practice3Results, "time3"],
    ] as const
  ).forEach(([session, field]) => {
    for (const result of session) {
      const key = String(result.driverNumber);
      if (!key) continue;

      const current = practiceByNumber.get(key) ?? {
        ...result,
        driverNumber: key,
        time: "-",
        time2: "-",
        time3: "-",
        laps: result.laps ?? 0,
        points: result.points ?? 0,
        teamColor: result.teamColor || getTeamColor(Number(key)) || "",
      };
      current[field] = result.time || "-";
      practiceByNumber.set(key, current);
    }
  });

  const practiceResults = [...practiceByNumber.values()];

  // 레이스 종류별 결과 배열 생성
  const currentResults =
    view === "race"
      ? raceResults
      : view === "practice"
        ? practiceResults
        : view === "sprint"
          ? sprintResults
          : qualifyingResults;

  // 포디움용 데이터: 현재 탭의 상위 3명에 imageUrl을 추가
  const podiumData: PodiumDriver[] = currentResults
    .slice(0, 3)
    .map((result, index) => ({
      position: index + 1,
      driverName: result.driverName,
      driverCode: result.driverCode || "",
      driverNumber: result.driverNumber,
      team: result.team,
      teamColor: result.teamColor,
      imageUrl: getDriverImageUrl(Number(result.driverNumber)),
    }));

  return (
    <div className="relative min-w-0 w-full scroll-mt-20" id="race-results">
      <div className="">
        <div className="min-w-0 w-full lg:w-auto lg:max-w-full lg:shrink-0">
          <RacingTypeTabMenu
            view={view}
            setView={setView}
            lastRaceResult={lastRaceResult}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* showPodium이면 넓은 화면에서 표와 포디움을 절반씩 배치 (글자 길이에 너비가 흔들리지 않게) */}
      <div
        className={`grid grid-cols-1 gap-10 py-2 sm:py-4  ${showPodium ? "lg:grid-cols-2" : ""}`}
      >
        {showPodium && (
          <div className="relative min-w-0 overflow-hidden py-2 sm:py-4">
            <PodiumStage podiumData={podiumData} isLoading={isLoading} />
          </div>
        )}
        <div className="relative min-w-0 overflow-hidden py-2 sm:py-4">
          <DataTable
            raceResults={currentResults}
            setHoveredRow={setHoveredRow}
            hoveredRow={hoveredRow}
            view={view}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
