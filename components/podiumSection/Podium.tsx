"use client";

import { Trophy, Medal } from "lucide-react";
import Image from "next/image";
import { getSessionResults } from "@/lib/sessionResultApi";
import type {
  DriverStandingPodium,
  PodiumDriver,
  Sessions,
} from "@/lib/types/types";
import { useEffect, useState } from "react";

import { getLastestMeeting } from "@/lib/lastestMeeting";
import type { LastestMeeting } from "@/lib/lastestMeeting";

// 포디움 드라이버 팀 로고
import McLarenLogo from "@/assets/img/teamLogo/McLaren.webp";
import MercedesLogo from "@/assets/img/teamLogo/Mercedes.svg";
import RedBullLogo from "@/assets/img/teamLogo/RedBull.svg";

// 포디움 드라이버 이미지
import MaxVerstappen from "@/assets/img/driverProfile/RedBull/max.webp";
import KimiAntonelli from "@/assets/img/driverProfile/Mercedes/kimi.webp";
import LandoNorris from "@/assets/img/driverProfile/McLaren/norris.webp";

export default function Podium() {
  const [driverStandingPodium, setDriverStandingPodium] = useState<
    DriverStandingPodium[]
  >([]);

  const [lastestMeeting, setLastestMeeting] = useState<LastestMeeting | null>(
    null
  );

  // 최근 레이스 데이터

  useEffect(() => {
    const fetchLastestMeeting = async () => {
      const lastestMeeting = await getLastestMeeting();

      setLastestMeeting(lastestMeeting);
    };
    fetchLastestMeeting();
  }, []);

  // 최근 포디움 드라이버 데이터

  useEffect(() => {
    const fetchSessionResults = async () => {
      try {
        const sessionResults = await getSessionResults();
        console.log("sessionResults", sessionResults);
        setDriverStandingPodium(
          sessionResults.map((result) => ({
            position: result.position,
            driver_number: result.driver_number,
          }))
        );
      } catch (error) {
        console.error("세션 결과를 불러오지 못했습니다.", error);
      }
    };
    fetchSessionResults();
  }, []);

  const getDriverName = (driver_number: number) => {
    switch (driver_number) {
      case 1:
        return "막스 베르스타펜 ";
      case 12:
        return "키미 안토넬리";
      case 4:
        return "랜도 노리스";

      default:
        return driver_number.toString();
    }
  };

  const getTeamName = (driver_number: number) => {
    switch (driver_number) {
      case 1:
        return "레드불";
      case 12:
        return "메르세데스";
      case 4:
        return "맥라렌";
      default:
        return driver_number.toString();
    }
  };

  const getTeamColor = (driver_number: number) => {
    switch (driver_number) {
      case 1:
        return "#1E41FF";
      case 12:
        return "#00D2BE";
      case 4:
        return "#FF8000";
      default:
        return "#000000";
    }
  };
  const getTeamLogoUrl = (driver_number: number) => {
    switch (driver_number) {
      case 1:
        return RedBullLogo.src;
      case 12:
        return MercedesLogo.src;
      case 4:
        return McLarenLogo.src;
      default:
        return "";
    }
  };

  const getDriverImageUrl = (driver_number: number) => {
    switch (driver_number) {
      case 1:
        return MaxVerstappen.src;
      case 12:
        return KimiAntonelli.src;
      case 4:
        return LandoNorris.src;
      default:
        return "";
    }
  };

  const podiumOrder = [1, 0, 2];
  const orderedDrivers = podiumOrder
    .map((index) => driverStandingPodium[index])
    .filter((driver): driver is DriverStandingPodium => driver !== undefined);

  const podiumData: PodiumDriver[] = orderedDrivers.map((driver) => ({
    position: driver.position,
    driverName: getDriverName(driver.driver_number),
    driverCode: driver.driver_number.toString(),
    team: getTeamName(driver.driver_number),
    teamColor: getTeamColor(driver.driver_number),
    imageUrl: getDriverImageUrl(driver.driver_number),
    teamLogoUrl: getTeamLogoUrl(driver.driver_number),
  }));

  const getPositionHeight = (position: number) => {
    switch (position) {
      case 1:
        return "h-40"; // 가장 높음
      case 2:
        return "h-32"; // 중간
      case 3:
        return "h-28"; // 가장 낮음
      default:
        return "h-28";
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="text-white" size={32} />;
      case 2:
        return <Medal className="text-white" size={28} />;
      case 3:
        return <Medal className="text-primary" size={24} />;
      default:
        return null;
    }
  };

  const getPositionGradient = (position: number) => {
    switch (position) {
      case 1:
        return "from-white/20 to-white/10";
      case 2:
        return "from-white/20 to-white/10";
      case 3:
        return "from-primary/20 to-primary/10";
      default:
        return "from-white/20 to-white/10";
    }
  };

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 p-6 animate-fade-in overflow-hidden shadow-lg">
      {/* 배경 레이어 1: 기본 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"></div>

      {/* 배경 레이어 2: 움직이는 그라데이션 */}
      <div className="absolute inset-0 podium-bg-gradient bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 opacity-60"></div>

      {/* 배경 레이어 3: 글로우 효과 */}
      <div
        className="absolute inset-0 podium-glow opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255, 59, 48, 0.2) 0%, transparent 50%)",
        }}
      ></div>
      <div
        className="absolute inset-0 podium-glow opacity-30"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
          animationDelay: "1.5s",
        }}
      ></div>

      {/* 배경 레이어 4: 반짝이는 요소들 */}
      <div className="absolute top-10 left-20 w-2 h-2 bg-primary rounded-full podium-sparkle opacity-60"></div>
      <div className="absolute top-20 right-32 w-1.5 h-1.5 bg-secondary rounded-full podium-sparkle opacity-60"></div>
      <div className="absolute bottom-20 left-32 w-1.5 h-1.5 bg-primary rounded-full podium-sparkle opacity-60"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-secondary rounded-full podium-sparkle opacity-60"></div>
      <div className="absolute bottom-32 left-40 w-1 h-1 bg-primary rounded-full podium-sparkle opacity-60"></div>

      {/* 배경 레이어 5: 패턴 오버레이 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* 컨텐츠 레이어 (z-index 상위) */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
              <Trophy className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                최근 레이스 포디움
              </h2>
              <p className="text-sm text-gray-600">
                {lastestMeeting?.circuit.country} |{" "}
                {lastestMeeting?.circuit.city} 그랑프리
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-center gap-6 md:gap-8 mt-8">
          {podiumData.map((driver, index) => (
            <div
              key={driver.position}
              className="flex flex-col items-center flex-1 max-w-[180px] group cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* 드라이버 정보 (위쪽) */}
              <div className="flex flex-col items-center mb-4 w-full">
                {/* 드라이버 이미지 */}
                {driver.imageUrl && (
                  <div className="relative w-28 h-28 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-primary/50 transition-colors duration-300 bg-gray-50">
                      <Image
                        src={driver.imageUrl}
                        alt={driver.driverName}
                        fill
                        className="object-cover object-center"
                        sizes="112px"
                        unoptimized
                      />
                    </div>
                    {/* 순위 아이콘 오버레이 */}
                    <div className="absolute -top-1 -right-1 z-10">
                      {getPositionIcon(driver.position)}
                    </div>
                  </div>
                )}

                {/* 팀 컬러 바 */}
                <div
                  className="w-1.5 h-10 rounded-full mb-3 transition-all duration-300 group-hover:shadow-lg"
                  style={{
                    backgroundColor: driver.teamColor,
                    boxShadow: `0 0 15px ${driver.teamColor}80`,
                  }}
                ></div>

                {/* 드라이버 정보 */}
                <div className="text-center">
                  <div className="font-bold text-base text-gray-900 mb-1.5 group-hover:text-primary transition-colors duration-300">
                    {driver.driverName}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {driver.teamLogoUrl && (
                      <div className="relative w-8 h-8 flex-shrink-0">
                        <Image
                          src={driver.teamLogoUrl}
                          alt={driver.team}
                          fill
                          className="object-contain opacity-90"
                          sizes="32px"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="text-sm text-gray-600">{driver.team}</div>
                  </div>
                  <div className="text-sm  font-mono text-gray-900">
                    #{driver.driverCode}
                  </div>
                </div>
              </div>

              {/* 포디움 (아래쪽) */}
              <div
                className={`w-full ${getPositionHeight(
                  driver.position
                )} relative rounded-t-lg bg-gradient-to-t ${getPositionGradient(
                  driver.position
                )} border-t-2 border-l-2 border-r-2 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 overflow-hidden`}
                style={{
                  borderTopColor:
                    driver.position === 1
                      ? "#FFFFFF"
                      : driver.position === 2
                      ? "#FFFFFF"
                      : "#FF3B30",
                  borderLeftColor:
                    driver.position === 1
                      ? "#FFFFFF"
                      : driver.position === 2
                      ? "#FFFFFF"
                      : "#FF3B30",
                  borderRightColor:
                    driver.position === 1
                      ? "#FFFFFF"
                      : driver.position === 2
                      ? "#FFFFFF"
                      : "#FF3B30",
                }}
              >
                {/* 포디움 번호 */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`text-5xl font-bold ${
                      driver.position === 1
                        ? "text-primary"
                        : driver.position === 2
                        ? "text-gray-600"
                        : "text-primary"
                    }`}
                  >
                    {driver.position}
                  </div>
                </div>

                {/* 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-t-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
