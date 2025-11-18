"use client";

import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getSessionResults } from "@/lib/sessionResultApi";
import type {
  DriverStandingPodium,
  PodiumDriver,
  Sessions,
} from "@/lib/types/types";
import { useEffect, useState } from "react";
import { getSessions } from "@/lib/sessionsApi";
import { getLastestMeeting } from "@/lib/lastestMeeting";
import type { LastestMeeting } from "@/lib/lastestMeeting";

// 모든 차량 이미지
import McLarenCar from "@/assets/img/car/McLaren/McLaren_Car.webp";
import MercedesCar from "@/assets/img/car/Mercedes/Mercedes_Car.webp";
import RedBullCar from "@/assets/img/car/RedBull/RedBull_Car.webp";

// 모든 팀 로고
import McLarenLogo from "@/assets/img/teamLogo/McLaren.webp";
import MercedesLogo from "@/assets/img/teamLogo/Mercedes.svg";
import RedBullLogo from "@/assets/img/teamLogo/RedBull.svg";
import FerrariLogo from "@/assets/img/teamLogo/Ferrari.svg";
import WilliamsLogo from "@/assets/img/teamLogo/Williams.svg";
import AstonMartinLogo from "@/assets/img/teamLogo/Martin.svg";
import HaasLogo from "@/assets/img/teamLogo/Haas.svg";
import AlpineLogo from "@/assets/img/teamLogo/Alpine.svg";
import KickSauberLogo from "@/assets/img/teamLogo/Kick.svg";
import RacingBullsLogo from "@/assets/img/teamLogo/RacingBulls.svg";

// 모든 드라이버 이미지
import MaxVerstappen from "@/assets/img/podium/Max_Podium.png";
import YukiTsunoda from "@/assets/img/driverProfile/RedBull/yuki.webp";
import KimiAntonelli from "@/assets/img/podium/Kimi_Podium4.png";
import GeorgeRussell from "@/assets/img/driverProfile/Mercedes/george.webp";
import LandoNorris from "@/assets/img/podium/Norris_Podium.png";
import OscarPiastri from "@/assets/img/driverProfile/McLaren/piastri.webp";
import CarlosSainz from "@/assets/img/driverProfile/Williams/sainz.webp";
import AlexAlbon from "@/assets/img/driverProfile/Williams/albon.webp";
import LewisHamilton from "@/assets/img/driverProfile/Ferrari/hamilton.webp";
import CharlesLeclerc from "@/assets/img/driverProfile/Ferrari/leclerc.webp";
import FernandoAlonso from "@/assets/img/driverProfile/AstonMartin/fernando.webp";
import LanceStroll from "@/assets/img/driverProfile/AstonMartin/stroll.webp";
import EstebanOcon from "@/assets/img/driverProfile/Haas/ocon.webp";
import OliverBearman from "@/assets/img/driverProfile/Haas/oliver.webp";
import GabrielBortoleto from "@/assets/img/driverProfile/KickSauber/gabriel.webp";
import NicoHulkenberg from "@/assets/img/driverProfile/KickSauber/niko.webp";
import PierreGasly from "@/assets/img/driverProfile/Alpine/gasly.webp";
import FrancoColapinto from "@/assets/img/driverProfile/Alpine/franco.webp";
import IsackHadjar from "@/assets/img/driverProfile/RacingBulls/isack.webp";
import LiamLawson from "@/assets/img/driverProfile/RacingBulls/lowson.webp";

export default function Podium() {
  const [driverStandingPodium, setDriverStandingPodium] = useState<
    DriverStandingPodium[]
  >([]);

  const [lastestMeeting, setLastestMeeting] = useState<LastestMeeting | null>(
    null
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 최근 레이스 데이터
  useEffect(() => {
    const fetchLastestMeeting = async () => {
      const lastestMeeting = await getLastestMeeting();

      setLastestMeeting(lastestMeeting);
    };
    fetchLastestMeeting();
  }, []);

  // 자동 슬라이드 기능
  useEffect(() => {
    if (driverStandingPodium.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const podiumCount = Math.min(3, driverStandingPodium.length);
        return prevIndex === podiumCount - 1 ? 0 : prevIndex + 1;
      });
    }, 5000); // 5초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [driverStandingPodium.length]);

  // 최근 포디움 드라이버 데이터
  useEffect(() => {
    const fetchSessionResults = async () => {
      setIsLoading(true);
      try {
        const sessionResults = await getSessionResults();
        console.log("sessionResults", sessionResults);
        setDriverStandingPodium(
          sessionResults.map((result) => ({
            position: result.position,
            driver_number: result.driver_number,
          }))
        );
        // 데이터 로드 시 인덱스 리셋
        setCurrentIndex(0);
      } catch (error) {
        console.error("세션 결과를 불러오지 못했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessionResults();
  }, []);

  const getCar = (driver_number: number) => {
    switch (driver_number) {
      case 4:
        return McLarenCar.src;
      case 12:
        return MercedesCar.src;
      case 1:
        return RedBullCar.src;
    }
  };

  const getDriverName = (driver_number: number) => {
    switch (driver_number) {
      case 1:
        return "Max Verstappen";
      case 22:
        return "유키 츠노다";
      case 63:
        return "조지 러셀";
      case 12:
        return "Kimi Antonelli";
      case 55:
        return "카를로스 사인츠";
      case 23:
        return "알렉스 알본";
      case 44:
        return "루이스 해밀턴";
      case 16:
        return "샤를 르클레르";
      case 14:
        return "페르난도 알론소";
      case 18:
        return "랜스 스트롤";
      case 31:
        return "에스테반 오콘";
      case 87:
        return "올리버 베어먼";
      case 5:
        return "가브리에우 보르툴레투";
      case 27:
        return "니코 휠켄베르그";
      case 10:
        return "피에르 가슬리";
      case 43:
        return "프란코 콜라핀토";
      case 6:
        return "아이작 하자르";
      case 30:
        return "리암 로슨";
      case 81:
        return "오스카 피아스트리";
      case 4:
        return "Lando Norris";

      default:
        return driver_number.toString();
    }
  };

  const getTeamName = (driver_number: number) => {
    switch (driver_number) {
      case 1:
        return "레드불";
      case 22:
        return "레드불";
      case 12:
        return "메르세데스";
      case 63:
        return "메르세데스";
      case 4:
        return "맥라렌";
      case 81:
        return "맥라렌";
      case 55:
        return "윌리엄스";
      case 23:
        return "윌리엄스";
      case 44:
        return "페라리";
      case 16:
        return "페라리";
      case 14:
        return "애스턴 마틴";
      case 18:
        return "애스턴 마틴";
      case 87:
        return "하스";
      case 31:
        return "하스";
      case 5:
        return "킥 자우버";
      case 27:
        return "킥 자우버";
      case 10:
        return "알핀";
      case 43:
        return "알핀";
      case 6:
        return "레이싱 불스";
      case 30:
        return "레이싱 불스";
      default:
        return driver_number.toString();
    }
  };

  const getTeamColor = (driver_number: number) => {
    switch (driver_number) {
      // Red Bull
      case 1:
      case 22:
        return "#1E41FF";
      // Mercedes
      case 12:
      case 63:
        return "#00D2BE";
      // McLaren
      case 4:
      case 81:
        return "#FF8000";
      // Ferrari
      case 44:
      case 16:
        return "#DC143C";
      // Williams
      case 55:
      case 23:
        return "#005AFF";
      // Aston Martin
      case 14:
      case 18:
        return "#006F62";
      // Haas
      case 31:
      case 87:
        return "#ED1C24";
      // Kick Sauber
      case 5:
      case 27:
        return "#52C41A";
      // Alpine
      case 10:
      case 43:
        return "#FF009C";
      // Racing Bulls
      case 6:
      case 30:
        return "#1E41FF";
      default:
        return "#1E293B";
    }
  };
  const getTeamLogoUrl = (driver_number: number) => {
    switch (driver_number) {
      case 1:
      case 22:
        return RedBullLogo.src;
      case 12:
      case 63:
        return MercedesLogo.src;
      case 4:
      case 81:
        return McLarenLogo.src;
      case 44:
      case 16:
        return FerrariLogo.src;
      case 55:
      case 23:
        return WilliamsLogo.src;
      case 14:
      case 18:
        return AstonMartinLogo.src;
      case 31:
      case 87:
        return HaasLogo.src;
      case 5:
      case 27:
        return KickSauberLogo.src;
      case 10:
      case 43:
        return AlpineLogo.src;
      case 6:
      case 30:
        return RacingBullsLogo.src;
      default:
        return "";
    }
  };

  const getDriverImageUrl = (driver_number: number) => {
    switch (driver_number) {
      case 1:
        return MaxVerstappen.src;
      case 22:
        return YukiTsunoda.src;
      case 12:
        return KimiAntonelli.src;
      case 63:
        return GeorgeRussell.src;
      case 4:
        return LandoNorris.src;
      case 81:
        return OscarPiastri.src;
      case 55:
        return CarlosSainz.src;
      case 23:
        return AlexAlbon.src;
      case 44:
        return LewisHamilton.src;
      case 16:
        return CharlesLeclerc.src;
      case 14:
        return FernandoAlonso.src;
      case 18:
        return LanceStroll.src;
      case 31:
        return EstebanOcon.src;
      case 87:
        return OliverBearman.src;
      case 5:
        return GabrielBortoleto.src;
      case 27:
        return NicoHulkenberg.src;
      case 10:
        return PierreGasly.src;
      case 43:
        return FrancoColapinto.src;
      case 6:
        return IsackHadjar.src;
      case 30:
        return LiamLawson.src;
      default:
        return "";
    }
  };

  // 포디움 순서대로 정렬 (1위, 2위, 3위)
  const podiumOrder = [0, 1, 2];
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
    carImageUrl: getCar(driver.driver_number),
  }));

  // 캐러셀 네비게이션 함수
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? podiumData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === podiumData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 로딩 화면
  if (isLoading) {
    return (
      <div className="relative w-full">
        {/* 헤더 섹션 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
              <Trophy className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                최근 레이스
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-400">
                데이터 로딩 중...
              </p>
            </div>
          </div>
        </div>

        {/* 로딩 컨테이너 */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 p-0">
          <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-20">
            {/* 로딩 스피너 */}
            <div className="relative">
              {/* 외부 회전 링 */}
              <div className="h-24 w-24 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
              {/* 내부 회전 링 */}
              <div
                className="absolute inset-0 h-24 w-24 animate-spin rounded-full border-4 border-transparent border-r-secondary"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
              {/* 중앙 아이콘 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy className="text-primary" size={32} />
              </div>
            </div>

            {/* 로딩 텍스트 */}
            <div className="mt-8 text-center">
              <div className="text-2xl font-bold text-white">
                포디움 데이터 로딩 중
              </div>
              <div className="mt-2 text-sm text-gray-400">
                잠시만 기다려주세요...
              </div>
            </div>

            {/* 진행 바 */}
            <div className="mt-8 w-full max-w-xs">
              <div className="h-1 overflow-hidden rounded-full bg-slate-700">
                <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* 헤더 섹션 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
            <Trophy className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-white">
              최근 레이스
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-400">
              {lastestMeeting?.circuit.country} · {lastestMeeting?.circuit.city}
            </p>
          </div>
        </div>
      </div>

      {/* 캐러셀 컨테이너 */}
      <div className="relative">
        {/* 드라이버 카드 슬라이더 */}
        <div className="relative overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {podiumData.map((driver) => {
              // 한글 이름 처리: 공백으로 나누거나, 없으면 전체를 큰 텍스트로
              const nameParts = driver.driverName.trim().split(/\s+/);
              const firstName = nameParts.length > 1 ? nameParts[0] : "";
              const lastName =
                nameParts.length > 1
                  ? nameParts.slice(1).join(" ")
                  : driver.driverName;

              const teamColor = driver.teamColor || "#1E293B";

              return (
                <div key={driver.position} className="min-w-full flex-shrink-0">
                  <div
                    className="relative overflow-hidden rounded-3xl p-0 transition-all duration-700"
                    style={{
                      backgroundColor: teamColor,
                    }}
                  >
                    {/* 메인 컨텐츠 */}
                    <div className="relative z-10 flex min-h-[500px] flex-col md:flex-row md:items-center md:justify-between px-[200px]">
                      {/* 왼쪽: 텍스트 영역 */}
                      <div className="flex flex-1 flex-col justify-center p-8 md:p-15">
                        <div className="space-y-4">
                          {/* 드라이버 이름 - 작은 부분 */}
                          {firstName && (
                            <div className="text-2xl font-bold tracking-wide text-white/90 md:text-3xl">
                              {firstName}
                            </div>
                          )}

                          {/* 드라이버 이름 - 큰 부분 */}
                          <div className="text-xl font-black leading-none tracking-tight text-white md:text-6xl lg:text-7xl">
                            {lastName}
                          </div>

                          {/* 서브텍스트 */}
                          <div className="mt-6 space-y-2">
                            <div className="flex items-center gap-3">
                              {driver.teamLogoUrl && (
                                <div
                                  className={`relative w-[50px] h-[50px] flex-shrink-0  ${
                                    driver.team === "맥라렌"
                                      ? "drop-shadow-[0_0_10px_rgba(0,0,0,0.4)]"
                                      : ""
                                  }`}
                                >
                                  <Image
                                    src={driver.teamLogoUrl}
                                    alt={driver.team}
                                    fill
                                    className={`object-contain ${
                                      driver.team === "맥라렌"
                                        ? "scale-125"
                                        : "scale-100"
                                    }`}
                                    sizes="40px"
                                    unoptimized
                                  />
                                </div>
                              )}
                              <div className="text-base font-medium text-white/70 md:text-lg">
                                {driver.team}
                              </div>
                            </div>
                            {driver.carImageUrl && (
                              <div className="relative  flex-shrink-0 w-[400px] h-[150px]">
                                <Image
                                  src={driver.carImageUrl}
                                  alt={driver.team}
                                  fill
                                  className="object-contain"
                                  sizes="140px"
                                  unoptimized
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 오른쪽: 드라이버 이미지 */}
                      <div className="relative flex items-end justify-end md:w-2/5">
                        {driver.imageUrl && (
                          <div className="relative w-full max-w-md">
                            {/* 드라이버 이미지 */}
                            <div className="relative p-10">
                              <div
                                className="relative aspect-[3/4] w-full overflow-hidden"
                                style={{
                                  clipPath:
                                    "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
                                }}
                              >
                                <Image
                                  src={driver.imageUrl}
                                  alt={driver.driverName}
                                  fill
                                  className={`object-cover object-center ${
                                    driver.imageUrl === KimiAntonelli.src
                                      ? "scale-110"
                                      : ""
                                  }`}
                                  sizes="(max-width: 768px) 100vw, 40vw"
                                  unoptimized
                                />
                                {/* 그라데이션 오버레이 */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                              </div>

                              {/* 순위 번호 */}
                              <div className="absolute -left-4 top-4 z-20">
                                <div className="text-6xl font-black leading-none tracking-tight text-white md:text-7xl lg:text-8xl drop-shadow-2xl">
                                  {driver.position}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        {podiumData.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-2xl bg-black/40 p-3 backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:scale-110"
              aria-label="이전 드라이버"
            >
              <ChevronLeft className="text-white" size={28} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-2xl bg-black/40 p-3 backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:scale-110"
              aria-label="다음 드라이버"
            >
              <ChevronRight className="text-white" size={28} />
            </button>
          </>
        )}

        {/* 인디케이터 */}
        {podiumData.length > 1 && (
          <div className="mt-6 flex justify-center gap-3">
            {podiumData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "h-2 w-8 rounded-full bg-white"
                    : "h-2 w-2 rounded-full bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`${index + 1}번째 드라이버로 이동`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
