import type { DriverStanding } from "@/lib/types/types";
import { getCurrentConstructorStandings } from "@/lib/api/currentCustrutor/CurrentConstrutor";
import { getCurrentDriverChampion } from "@/lib/api/currentDriverChampion/CurrentDriverChampion";
import type { ConstructorsChampionshipResponse } from "@/lib/api/currentCustrutor/CurrentConstrutor";
import type { DriverChampion } from "@/lib/api/currentDriverChampion/CurrentDriverChampion";
import { useState, useEffect } from "react";
import {
  getConstructorTeamName,
  getConstructorTeamColor,
  getConstructorTeamLogoUrl,
} from "@/lib/utils/driverUtils";
interface ConstructorSectionProps {
  view: "drivers" | "constructors";
  setView: (view: "drivers" | "constructors") => void;
  setHoveredPosition: (position: number | null) => void;
  hoveredPosition: number | null;
  MedalIcon: React.ElementType;
  TrophyIcon: React.ElementType;
}
export default function ConstructorSection({
  view,
  setView,
  setHoveredPosition,
  hoveredPosition,
  MedalIcon,
  TrophyIcon: TrophyIcon,
}: ConstructorSectionProps) {
  const [constructorStandings, setConstructorStandings] = useState<
    ConstructorsChampionshipResponse[]
  >([]);
  const [driverChampion, setDriverChampion] = useState<DriverChampion[] | null>(
    null
  );

  console.log("driverChampion", driverChampion);

  // 컨스트럭터 순위 데이터
  useEffect(() => {
    const fetchConstructorStandings = async () => {
      const constructorStandings = await getCurrentConstructorStandings();
      if (constructorStandings) {
        setConstructorStandings(constructorStandings);
      }
    };
    fetchConstructorStandings();
  }, []);

  // 드라이버 챔피언 데이터
  useEffect(() => {
    const fetchDriverChampion = async () => {
      const driverChampion = await getCurrentDriverChampion();
      if (driverChampion) {
        setDriverChampion(driverChampion);
      }
    };
    fetchDriverChampion();
  }, []);

  interface ConstructorStanding {
    position: number;
    teamName: string;
    team: string;
    points: number;
    wins: number;
  }

  // 컨스트럭터 순위 데이터
  const constructorStandingData: ConstructorStanding[] = [
    ...constructorStandings.map((standing) => ({
      position: standing.position,
      teamName: standing.team.teamName,
      team: standing.team.teamName,
      points: standing.points,
      wins: standing.wins,
    })),
  ];

  // 드라이버 챔피언 데이터

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
      {view === "constructors" && (
        <div className="space-y-3">
          {constructorStandingData.map((standing, index) => {
            // const percentage = (standing.points / maxPoints) * 100;
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
                    background: standing.team
                      ? `linear-gradient(90deg, ${standing.team}15 0%, transparent 100%)`
                      : "none",
                  }}
                ></div>

                <div className="relative p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 ">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg relative">
                        {standing.position === 1 && (
                          <TrophyIcon
                            className="text-primary animate-pulse-slow"
                            size={28}
                          />
                        )}
                        {standing.position === 2 && (
                          <MedalIcon className="text-gray-400" size={28} />
                        )}
                        {standing.position === 3 && (
                          <MedalIcon className="text-orange-600" size={28} />
                        )}
                        {standing.position > 3 && (
                          <span className="text-2xl font-bold text-gray-400">
                            {standing.position}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-7">
                        <div className="text-sm text-gray-600">
                          <img
                            src={getConstructorTeamLogoUrl(standing.teamName)}
                            alt={standing.teamName}
                            className="h-[30px] w-[30px] object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <div className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors duration-300">
                              {getConstructorTeamName(standing.teamName)}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: getConstructorTeamColor(
                                  standing.teamName
                                ),
                              }}
                            ></div>
                            <div className="text-sm text-gray-600">
                              {standing.teamName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                        {standing.points}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {standing.wins}승
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "drivers" && (
        <div className="space-y-3">
          {constructorStandingData?.map((standing, index) => {
            // const percentage = (standing.points / maxPoints) * 100;
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
                    background: standing.team
                      ? `linear-gradient(90deg, ${standing.team}15 0%, transparent 100%)`
                      : "none",
                  }}
                ></div>

                <div className="relative p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 ">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg relative">
                        {standing.position === 1 && (
                          <TrophyIcon
                            className="text-primary animate-pulse-slow"
                            size={28}
                          />
                        )}
                        {standing.position === 2 && (
                          <MedalIcon className="text-gray-400" size={28} />
                        )}
                        {standing.position === 3 && (
                          <MedalIcon className="text-orange-600" size={28} />
                        )}
                        {standing.position > 3 && (
                          <span className="text-2xl font-bold text-gray-400">
                            {standing.position}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-7">
                        <div className="text-sm text-gray-600">
                          <img
                            src={getConstructorTeamLogoUrl(standing.teamName)}
                            alt={standing.teamName}
                            className="h-[30px] w-[30px] object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <div className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors duration-300">
                              {getConstructorTeamName(standing.teamName)}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: getConstructorTeamColor(
                                  standing.teamName
                                ),
                              }}
                            ></div>
                            <div className="text-sm text-gray-600">
                              {standing.teamName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                        {standing.points}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {standing.wins}승
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
  );
}

// <div className="text-center py-16 text-gray-600">
//   <div className="mb-6">
//     <div className="relative inline-block">
//       <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
//       <div
//         className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-r-secondary"
//         style={{
//           animationDirection: "reverse",
//           animationDuration: "1.5s",
//         }}
//       ></div>
//     </div>
//   </div>
//   <p className="text-base font-medium">
//     드라이버 순위 데이터 로딩 중...
//   </p>
// </div>
