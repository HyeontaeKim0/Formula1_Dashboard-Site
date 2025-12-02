"use client";

import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type {
  DriverStandingPodium,
  PodiumDriver,
  Sessions,
} from "@/lib/types/types";
import { useEffect, useState } from "react";

import { getSessionResults } from "@/lib/api/sessionResultApi/sessionResultApi";
import { getLastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";

import type { LastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";

import {
  getCar,
  getDriverName,
  getTeamName,
  getTeamColor,
  getTeamLogoUrl,
  getDriverImageUrl,
  KimiAntonelli,
} from "@/lib/utils/driverUtils";

export default function Podium() {
  const [driverStandingPodium, setDriverStandingPodium] = useState<
    DriverStandingPodium[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 최근레이스, fastestLap,,,기타등등
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
            <h3 className="text-xl font-bold tracking-tight text-gray-600">
              최근 레이스
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-500">
              {lastestMeeting?.circuit.country} · {lastestMeeting?.circuit.city}{" "}
              그랑프리
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
                    <div className="relative z-10 flex min-h-[500px] flex-col md:flex-row md:items-center md:justify-between px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[200px]">
                      {/* 왼쪽: 텍스트 영역 */}
                      <div className="flex flex-1 flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-15">
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
                                      driver.team === "McLaren"
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
                              <div className="relative flex-shrink-0 w-full max-w-[400px] h-[100px] sm:h-[120px] md:h-[150px]">
                                <Image
                                  src={driver.carImageUrl}
                                  alt={driver.team}
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 400px"
                                  unoptimized
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 오른쪽: 드라이버 이미지 */}
                      <div className="relative flex items-end justify-end w-full md:w-2/5 mt-4 md:mt-0">
                        {driver.imageUrl && (
                          <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg">
                            {/* 드라이버 이미지 */}
                            <div className="relative p-2 sm:p-4 md:p-6 lg:p-8">
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
                                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 448px, 512px"
                                  unoptimized
                                />
                                {/* 그라데이션 오버레이 */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                              </div>

                              {/* 순위 번호 */}
                              <div className="absolute -left-2 sm:-left-3 md:-left-4 top-2 sm:top-3 md:top-4 z-20">
                                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight text-white drop-shadow-2xl">
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
