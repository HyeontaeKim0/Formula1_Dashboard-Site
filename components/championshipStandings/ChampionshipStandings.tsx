"use client";

import { Trophy, Medal } from "lucide-react";
import { useState } from "react";

import { getSessionResults } from "@/lib/sessionResultApi";
import type { DriverStanding } from "@/lib/types/types";

console.log(getSessionResults());

// 임시 하드 코딩
const driverStandings: DriverStanding[] = [
  {
    position: 1,
    driverName: "랜도 노리스",
    driverCode: "NOR",
    team: "맥라렌",
    points: 357,
    wins: 6,
    podiums: 16,
    teamColor: "#FF8000",
  },
  {
    position: 2,
    driverName: "오스카 피아스트리",
    driverCode: "PIA",
    team: "맥라렌",
    points: 356,
    wins: 7,
    podiums: 14,
    teamColor: "#FF8000",
  },
  {
    position: 3,
    driverName: "막스 베르스타펜",
    driverCode: "VER",
    team: "레드불",
    points: 321,
    wins: 5,
    podiums: 11,
    teamColor: "#1E41FF",
  },
  {
    position: 4,
    driverName: "조지 러셀",
    driverCode: "RUS",
    team: "메르세데스",
    points: 258,
    wins: 2,
    podiums: 8,
    teamColor: "#00D2BE",
  },
  {
    position: 5,
    driverName: "샤를 르클레르",
    driverCode: "LEC",
    team: "페라리",
    points: 210,
    wins: 0,
    podiums: 7,
    teamColor: "#DC143C",
  },
];

const maxPoints = driverStandings[0].points;

export default function ChampionshipStandings() {
  const [view, setView] = useState<"drivers" | "constructors">("drivers");
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      {/* 헤더 섹션 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
            <Medal className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
              챔피언십 순위
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-600">2025 시즌</p>
          </div>
        </div>
        <div className="flex space-x-1 rounded-2xl bg-gray-100 p-1 border border-gray-200">
          <button
            onClick={() => setView("drivers")}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
              view === "drivers"
                ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            드라이버
          </button>
          <button
            onClick={() => setView("constructors")}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
              view === "constructors"
                ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            컨스트럭터
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
        {view === "drivers" && (
          <div className="space-y-3">
            {driverStandings.map((standing, index) => {
              const percentage = (standing.points / maxPoints) * 100;
              return (
                <div
                  key={standing.position}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-md"
                  onMouseEnter={() => setHoveredPosition(standing.position)}
                  onMouseLeave={() => setHoveredPosition(null)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: standing.teamColor
                        ? `linear-gradient(90deg, ${standing.teamColor}15 0%, transparent 100%)`
                        : "none",
                    }}
                  ></div>

                  <div className="relative p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg relative">
                        {standing.position === 1 && (
                          <Trophy
                            className="text-primary animate-pulse-slow"
                            size={28}
                          />
                        )}
                        {standing.position === 2 && (
                          <Medal className="text-gray-400" size={28} />
                        )}
                        {standing.position === 3 && (
                          <Medal className="text-primary" size={28} />
                        )}
                        {standing.position > 3 && (
                          <span className="text-2xl font-bold text-gray-400">
                            {standing.position}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors duration-300">
                          {standing.driverName}
                        </div>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: standing.teamColor }}
                          ></div>
                          <div className="text-sm text-gray-600">
                            {standing.team}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {standing.points}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {standing.wins}승 · {standing.podiums}포디움
                      </div>
                    </div>
                  </div>
                    <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${percentage}%`,
                          background: standing.teamColor
                            ? `linear-gradient(90deg, ${standing.teamColor} 0%, ${standing.teamColor}CC 100%)`
                            : "linear-gradient(90deg, #FF3B30 0%, #FFFFFF 100%)",
                          boxShadow:
                            hoveredPosition === standing.position
                              ? `0 0 15px ${standing.teamColor || "#FF3B30"}80`
                              : "none",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {view === "constructors" && (
          <div className="text-center py-16 text-gray-600">
            <div className="mb-6">
              <div className="relative inline-block">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
                <div
                  className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-r-secondary"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                  }}
                ></div>
              </div>
            </div>
            <p className="text-base font-medium">컨스트럭터 순위 데이터 로딩 중...</p>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-gray-200">
          <button className="w-full py-3.5 text-sm font-semibold text-gray-700 hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-gray-200 hover:border-primary bg-gradient-to-r from-gray-50 to-white hover:from-primary hover:to-primary-dark group">
            <span className="flex items-center justify-center space-x-2">
              <span>전체 순위 보기</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
