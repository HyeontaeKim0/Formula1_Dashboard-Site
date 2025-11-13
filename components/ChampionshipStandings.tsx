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
    <div className="bg-gradient-to-br from-dark-light to-dark rounded-xl border border-dark-lighter p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/30">
            <Medal className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">챔피언십 순위</h2>
            <p className="text-sm text-gray-400">2025 시즌</p>
          </div>
        </div>
        <div className="flex space-x-1 bg-dark rounded-lg p-1 border border-dark-lighter">
          <button
            onClick={() => setView("drivers")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
              view === "drivers"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                : "text-gray-400 hover:text-white hover:bg-dark-light"
            }`}
          >
            드라이버
          </button>
          <button
            onClick={() => setView("constructors")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
              view === "constructors"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                : "text-gray-400 hover:text-white hover:bg-dark-light"
            }`}
          >
            컨스트럭터
          </button>
        </div>
      </div>

      {view === "drivers" && (
        <div className="space-y-3">
          {driverStandings.map((standing, index) => {
            const percentage = (standing.points / maxPoints) * 100;
            return (
              <div
                key={standing.position}
                className="group relative overflow-hidden bg-gradient-to-r from-dark to-dark-light rounded-lg border border-dark-lighter hover:border-primary transition-all duration-300 hover-scale cursor-pointer"
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
                      ? `linear-gradient(90deg, ${standing.teamColor}05 0%, transparent 100%)`
                      : "none",
                  }}
                ></div>

                <div className="relative p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg relative">
                        {standing.position === 1 && (
                          <Trophy
                            className="text-yellow-500 animate-pulse-slow"
                            size={28}
                          />
                        )}
                        {standing.position === 2 && (
                          <Medal className="text-gray-300" size={28} />
                        )}
                        {standing.position === 3 && (
                          <Medal className="text-orange-500" size={28} />
                        )}
                        {standing.position > 3 && (
                          <span className="text-2xl font-bold text-gray-500">
                            {standing.position}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                          {standing.driverName}
                        </div>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: standing.teamColor }}
                          ></div>
                          <div className="text-sm text-gray-400">
                            {standing.team}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {standing.points}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {standing.wins}승 · {standing.podiums}포디움
                      </div>
                    </div>
                  </div>
                  <div className="relative h-2 bg-dark rounded-full overflow-hidden">
                    <div
                      className="progress-bar absolute top-0 left-0 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${percentage}%`,
                        background: standing.teamColor
                          ? `linear-gradient(90deg, ${standing.teamColor} 0%, ${standing.teamColor}CC 100%)`
                          : "linear-gradient(90deg, #00D4FF 0%, #06FFA5 100%)",
                        boxShadow:
                          hoveredPosition === standing.position
                            ? `0 0 10px ${standing.teamColor || "#00D4FF"}`
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
        <div className="text-center py-12 text-gray-400 animate-fade-in">
          <div className="mb-4">
            <div
              className="inline-block w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
              style={{ animationDuration: "2s" }}
            ></div>
          </div>
          <p>컨스트럭터 순위 데이터 로딩 중...</p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-dark-lighter">
        <button className="w-full py-3 text-sm font-medium text-gray-300 hover:text-white bg-dark hover:bg-primary/10 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-dark-lighter hover:border-primary/50 group">
          <span className="flex items-center justify-center space-x-2">
            <span>전체 순위 보기</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
