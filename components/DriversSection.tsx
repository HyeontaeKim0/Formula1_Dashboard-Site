"use client";

import { Trophy, Medal, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import NetherlandsFlag from "@/assets/img/flags/netherlands.svg";
import type { Driver, DriversSectionProps } from "@/lib/types/types";

export type { Driver } from "@/lib/types/types";

// 기본 드라이버 데이터 (fallback)
const defaultDrivers: Driver[] = [
  {
    driverName: "랜도 노리스",
    driverCode: "NOR",
    team: "맥라렌",
    teamColor: "#FF8000",
    teamLogoUrl:
      "https://i.namu.wiki/i/NMVkodqAXkSDUBnIu-PG7rHKsJSdUj-M7zfEW3i1aoB_QWP2QC5CaJT90iK0wJpzefENKLG-Fhtd59o1Qr1qHQ.webp",
    driverImageUrl:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2025/lannor01.png",
    points: 357,
    wins: 6,
    podiums: 16,
    position: 1,
    nationality: "영국",
  },
];

export default function DriversSection({
  drivers = defaultDrivers,
}: DriversSectionProps) {
  const [hoveredDriver, setHoveredDriver] = useState<string | null>(null);

  const getPositionBadge = (position: number) => {
    if (position === 1) {
      return (
        <div className="absolute top-3 right-3 z-10">
          <Trophy className="text-yellow-400" size={24} />
        </div>
      );
    } else if (position === 2) {
      return (
        <div className="absolute top-3 right-3 z-10">
          <Medal className="text-gray-300" size={20} />
        </div>
      );
    } else if (position === 3) {
      return (
        <div className="absolute top-3 right-3 z-10">
          <Medal className="text-orange-500" size={20} />
        </div>
      );
    }
    return null;
  };

  console.log("drivers", drivers);

  //

  return (
    <div className="bg-gradient-to-br from-dark-light to-dark rounded-xl border border-dark-lighter p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
            <Users className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">드라이버</h2>
            <p className="text-sm text-gray-400">2025 시즌 드라이버 목록</p>
          </div>
        </div>
      </div>

      {drivers.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>드라이버 데이터를 불러올 수 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {drivers.map((driver, index) => (
            <div
              key={driver.driverCode || driver.driverNumber || index}
              className="group relative overflow-hidden bg-gradient-to-br from-dark to-dark-light rounded-lg border border-dark-lighter hover:border-primary transition-all duration-300 hover-scale cursor-pointer"
              onMouseEnter={() => setHoveredDriver(driver.driverCode)}
              onMouseLeave={() => setHoveredDriver(null)}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {/* 배경 글로우 효과 */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${driver.teamColor}15 0%, transparent 70%)`,
                }}
              ></div>

              {/* 순위 배지 */}
              {/* {getPositionBadge(driver.position)} */}

              {/* 드라이버 이미지 및 정보 */}
              <div className="relative p-4">
                {/* 드라이버 이미지 */}
                {driver.driverImageUrl && (
                  <div className="relative w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle, ${driver.teamColor}40 0%, transparent 70%)`,
                      }}
                    ></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-dark-lighter group-hover:border-primary/50 transition-colors duration-300 bg-dark">
                      <Image
                        src={driver.driverImageUrl}
                        alt={driver.driverName}
                        fill
                        className="object-cover object-center"
                        sizes="96px"
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                {/* 드라이버 이름 */}
                <div className="text-center mb-3">
                  <h3 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors duration-300">
                    {driver.driverName}
                  </h3>
                  <div className="text-sm font-mono text-gray-400 mb-2">
                    {driver.driverCode}
                    {driver.driverNumber && ` #${driver.driverNumber}`}
                  </div>

                  {/* 팀 정보 */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {driver.teamLogoUrl && (
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <Image
                          src={driver.teamLogoUrl}
                          alt={driver.team}
                          fill
                          className="object-contain opacity-90"
                          sizes="24px"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="text-xs text-gray-400">{driver.team}</div>
                  </div>

                  {/* 팀 컬러 바 */}
                  <div
                    className="w-full h-1 rounded-full mb-3 transition-all duration-300"
                    style={{
                      backgroundColor: driver.teamColor,
                      boxShadow:
                        hoveredDriver === driver.driverCode
                          ? `0 0 10px ${driver.teamColor}`
                          : "none",
                    }}
                  ></div>
                </div>

                {/* 통계 정보 */}
                {(driver.points > 0 ||
                  driver.wins > 0 ||
                  driver.podiums > 0) && (
                  <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-dark-lighter">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">포인트</div>
                      <div className="text-base font-bold text-primary">
                        {driver.points}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">승리</div>
                      <div className="text-base font-bold text-white">
                        {driver.wins}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">포디움</div>
                      <div className="text-base font-bold text-white">
                        {driver.podiums}
                      </div>
                    </div>
                  </div>
                )}

                {/* 순위 표시 */}
                {driver.position > 0 && (
                  <div className="mt-3 pt-3 border-t border-dark-lighter text-center">
                    <div className="text-xs text-gray-500 mb-1">
                      드라이버 번호
                    </div>
                    <div className="text-2xl font-bold text-white">
                      #{driver.driverNumber || driver.position}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
