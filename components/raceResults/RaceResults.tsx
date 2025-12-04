"use client";

import { Trophy, Award, Clock, ChevronRight } from "lucide-react";
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
  getTeamLogoUrl,
} from "@/lib/utils/driverUtils";
import RacingTypeTabMenu from "./components/RacingTypeTabMenu";

import HeaderSection from "./components/HeaderSection";
import DataTable from "./components/DataTable";

export default function RaceResults() {
  // 마우스 오버 상태
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  // 레이스 결과
  const [lastRaceResult, setLastRaceResult] = useState<any | null>(null);
  // 프렉티스 결과
  const [freePractice1Result, setFreePractice1Result] = useState<any | null>(
    null
  );
  const [freePractice2Result, setFreePractice2Result] = useState<any | null>(
    null
  );
  const [freePractice3Result, setFreePractice3Result] = useState<any | null>(
    null
  );
  // 스프린트 결과
  const [sprintResult, setSprintResult] = useState<any | null>(null);
  // 퀄리파이 결과
  const [qualifyingResult, setQualifyingResult] = useState<any | null>(null);

  // 탭메뉴 상태
  const [view, setView] = useState<
    "practice" | "sprint" | "qualifying" | "race"
  >("race");

  // 레이스
  useEffect(() => {
    const fetchLastRaceResult = async () => {
      const lastRaceResult = await getLastRaceResult();
      setLastRaceResult(lastRaceResult);
    };
    fetchLastRaceResult();
  }, []);

  // 프렉티스
  useEffect(() => {
    const fetchLastPracticeResult = async () => {
      const lastPracticeResult = await getLastPractice1Result();
      setFreePractice1Result(lastPracticeResult);
    };
    fetchLastPracticeResult();
  }, []);

  // 스프린트
  useEffect(() => {
    const fetchLastSprintRaceResult = async () => {
      const lastSprintRaceResult = await getLastSprintRaceResult();
      setSprintResult(lastSprintRaceResult);
    };
    fetchLastSprintRaceResult();
  }, []);

  // FP2, FP3는 sprintResult가 null일 때만 fetch
  useEffect(() => {
    if (sprintResult === null) {
      const fetchLastPractice2Result = async () => {
        const lastPractice2Result = await getLastPractice2Result();
        setFreePractice2Result(lastPractice2Result);
      };
      fetchLastPractice2Result();
    } else {
      // sprintResult가 있으면 FP2, FP3를 비활성화 (null로 설정)
      setFreePractice2Result(null);
      setFreePractice3Result(null);
    }
  }, [sprintResult]);

  useEffect(() => {
    if (sprintResult === null) {
      const fetchLastPractice3Result = async () => {
        const lastPractice3Result = await getLastPractice3Result();
        setFreePractice3Result(lastPractice3Result);
      };
      fetchLastPractice3Result();
    }
  }, [sprintResult]);

  // 퀄리파이
  useEffect(() => {
    const fetchLastQualifyResult = async () => {
      const lastQualifyResult = await getLastQualifyResult();
      setQualifyingResult(lastQualifyResult);
    };
    fetchLastQualifyResult();
  }, []);

  // position을 숫자로 변환하는 함수 (문자열은 큰 숫자로 변환하여 맨 뒤로)
  const parsePosition = (position: any, index: number): number => {
    if (typeof position === "number") return position;
    if (typeof position === "string") {
      const num = parseInt(position, 10);
      if (!isNaN(num)) return num;
      // "NC", "DSQ" 등의 문자열은 9999로 변환하여 맨 뒤로, position
      return 9999;
    }
    // position이 없는 경우 그냥 1~29으로 순위를 줌 아니 랜덤 말고
    if (!position) return index + 1; // index는 배열의 인덱스로 1~29까지 순위를 줌

    return 9999;
  };

  // 각 드라이버별 결과를 배열로 변환 (레이스)
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
        // 원본 position 값도 저장 (표시용)
        originalPosition: result.position,
      }))
      .sort((a: any, b: any) => a.position - b.position) || [];

  // 각 드라이버별 결과를 배열로 변환 (퀄리파이)
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
        // 원본 position 값도 저장 (표시용)
        originalPosition: result.position,
      }))
      .sort((a: any, b: any) => a.position - b.position) || [];

  // 각 드라이버별 결과를 배열로 변환 (스프린트)
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
        // 원본 position 값도 저장 (표시용)
        originalPosition: result.position,
      }))
      .sort((a: any, b: any) => a.position - b.position) || [];

  // 각 드라이버별 결과를 배열로 변환 (프렉티스)
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
        // 원본 position 값도 저장 (표시용)
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

  //  practice1Results, practice2Results, practice3Results의 time만 통합
  // sprintResult가 null일 때만 FP2, FP3 데이터를 사용
  const practiceResults = practice1Results.map((result) => {
    // sprintResult가 null일 때만 FP2, FP3 데이터를 찾음
    const practice2Result =
      sprintResult === null
        ? practice2Results.find(
            (r) => r.driverNumber === result.driverNumber && r.time !== ""
          )
        : undefined;
    const practice3Result =
      sprintResult === null
        ? practice3Results.find(
            (r) => r.driverNumber === result.driverNumber && r.time !== ""
          )
        : undefined;
    return {
      ...result,
      time2: practice2Result?.time,
      time3: practice3Result?.time,
    };
  });

  return (
    <div className="relative w-full">
      {/* 헤더 섹션 */}
      <div className="mb-6 flex items-center justify-between">
        <HeaderSection lastRaceResult={lastRaceResult} />

        <div className=" flex  justify-end">
          <RacingTypeTabMenu view={view} setView={setView} />
        </div>
      </div>
      {/* 메인 컨텐츠 */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
        <DataTable
          raceResults={
            view === "race"
              ? raceResults
              : view === "practice"
              ? practiceResults
              : view === "sprint"
              ? sprintResults
              : qualifyingResults
          }
          setHoveredRow={setHoveredRow}
          hoveredRow={hoveredRow}
          view={view}
        />
      </div>
    </div>
  );
}
