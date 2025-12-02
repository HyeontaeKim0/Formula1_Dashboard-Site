"use client";

import { Trophy, Award, Clock, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getLastRaceResult } from "@/lib/api/lastRaceResultApi/lastRaceResult";
import type { DriverResult } from "@/lib/types/types";
import {
  getDriverName,
  getTeamColor,
  getTeamName,
  getTeamLogoUrl,
} from "@/lib/utils/driverUtils";
import RacingTypeTabMenu from "./components/RacingTypeTabMenu";

import HeaderSection from "./components/HeaderSection";

export default function RaceResults() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [lastRaceResult, setLastRaceResult] = useState<any | null>(null);
  const [view, setView] = useState<
    "practice" | "sprint" | "qualifying" | "race"
  >("practice");

  useEffect(() => {
    const fetchLastRaceResult = async () => {
      const lastRaceResult = await getLastRaceResult();
      setLastRaceResult(lastRaceResult);
    };
    fetchLastRaceResult();
  }, []);

  // position을 숫자로 변환하는 함수 (문자열은 큰 숫자로 변환하여 맨 뒤로)
  const parsePosition = (position: any): number => {
    if (typeof position === "number") return position;
    if (typeof position === "string") {
      const num = parseInt(position, 10);
      if (!isNaN(num)) return num;
      // "NC", "DSQ" 등의 문자열은 9999로 변환하여 맨 뒤로
      return 9999;
    }
    return 9999;
  };

  // console.log("lastRaceResult", lastRaceResult);

  // 각 드라이버별 결과를 배열로 변환
  const raceResults: DriverResult[] =
    lastRaceResult?.races?.results
      ?.map((result: any) => ({
        position: parsePosition(result.position),
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

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return "text-yellow-600";
      case 2:
        return "text-gray-600";
      case 3:
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="relative w-full">
      {/* 헤더 섹션 */}
      <div className="mb-6 flex items-center justify-between">
        <HeaderSection lastRaceResult={lastRaceResult} />
        {/* <span className="text-xs font-extrabold px-3 py-1.5 bg-primary/20 text-primary rounded-full border border-primary/30">
          {lastRaceResult?.races?.round || 0} 라운드
        </span> */}
        <div className=" flex  justify-end">
          <RacingTypeTabMenu view={view} setView={setView} />
        </div>
      </div>
      {/* 메인 컨텐츠 */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                  순위
                </th>
                <th className="text-left py-4 px-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                  드라이버
                </th>
                <th className="text-left py-4 px-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                  시간
                </th>
                <th className="text-center py-4 px-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                  랩
                </th>
                <th className="text-center py-4 px-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                  포인트
                </th>
              </tr>
            </thead>
            <tbody>
              {raceResults.map((result, index) => (
                <tr
                  key={`${result.position}-${index}`}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 group cursor-pointer relative"
                  onMouseEnter={() => setHoveredRow(result.position)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`font-bold text-lg ${getPositionColor(
                          result.position
                        )}`}
                      >
                        {(result as any).originalPosition ?? result.position}
                      </span>
                      {result.position === 1 &&
                        typeof (result as any).originalPosition ===
                          "number" && (
                          <Trophy
                            className={`${getPositionColor(
                              result.position
                            )} animate-pulse-slow`}
                            size={18}
                          />
                        )}
                      {result.position === 2 &&
                        typeof (result as any).originalPosition ===
                          "number" && (
                          <Award
                            className={getPositionColor(result.position)}
                            size={18}
                          />
                        )}
                      {result.position === 3 &&
                        typeof (result as any).originalPosition ===
                          "number" && (
                          <Award
                            className={getPositionColor(result.position)}
                            size={18}
                          />
                        )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      {result.teamColor && (
                        <div
                          className="w-1.5 h-12 rounded-full transition-all duration-300 group-hover:shadow-lg"
                          style={{
                            backgroundColor: result.teamColor,
                            boxShadow:
                              hoveredRow === result.position
                                ? `0 0 15px ${result.teamColor}80`
                                : "none",
                          }}
                        ></div>
                      )}
                      <div>
                        <div className="font-semibold text-sm  text-gray-900 group-hover:text-primary transition-colors duration-300">
                          {result.driverName}
                        </div>
                        <div className="flex items-center gap-[7px]">
                          <div className="text-sm text-gray-600 font-medium">
                            {result.team}
                          </div>
                          {getTeamLogoUrl(
                            Number(result.driverNumber || "0")
                          ) && (
                            <div className="mt-1">
                              <img
                                src={getTeamLogoUrl(
                                  Number(result.driverNumber || "0")
                                )}
                                alt={`${result.team} 로고`}
                                className="h-[23px] w-[23px] object-contain"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1.5">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-sm font-mono font-medium">
                        {result.time || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-gray-700 font-semibold">
                    {result.laps}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-bold text-lg text-primary">
                        {result.points}
                      </span>
                      {/* <ChevronRight
                        size={16}
                        className="text-gray-400 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                      /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 
        <div className="mt-6 pt-5 border-t border-gray-200">
          <button className="w-full py-3.5 text-sm font-semibold text-gray-700 hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-gray-200 hover:border-primary bg-gradient-to-r from-gray-50 to-white hover:from-primary hover:to-primary-dark group">
            <span className="flex items-center justify-center space-x-2">
              <span>전체 결과 보기</span>
              <ChevronRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
}
