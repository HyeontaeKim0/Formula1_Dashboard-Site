"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { PodiumDriver } from "@/lib/types/types";
import { useEffect, useState } from "react";
import type { LastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";
import Norris from "@/assets/img/champion/champion_Norris3.jpg";
import nullRaceBackground from "@/assets/img/error/Null.png";
import McLaren from "@/assets/img/teamLogo/McLaren.webp";
import { KimiAntonelli } from "@/lib/utils/driverUtils";
import NotFound from "@/components/common/notFound/NotFound";

type DriverCardSliderProps = {
  lastestMeeting: LastestMeeting | null;
  podiumData: PodiumDriver[];
};

function isUaeChampionSeason(meeting: LastestMeeting | null) {
  return (
    meeting?.winner !== null &&
    meeting?.circuit?.country === "United Arab Emirates" &&
    meeting?.season === new Date().getFullYear()
  );
}

function getDriverDisplayName(driver: PodiumDriver): string {
  const { driverName, driverCode } = driver;
  if (typeof driverName === "string" && driverName.trim()) {
    return driverName.trim();
  }
  if (driverName != null && driverName !== "") {
    return String(driverName);
  }
  return driverCode || "Driver";
}

function DriverImage({ driver }: { driver: PodiumDriver }) {
  if (!driver.imageUrl) return null;

  return (
    <div className="relative w-[min(68vw,210px)] sm:w-[260px] md:w-[280px] lg:w-[300px]">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        }}
      >
        <Image
          src={driver.imageUrl}
          alt={getDriverDisplayName(driver)}
          fill
          className={`object-cover object-[center_15%] sm:object-top ${
            driver.imageUrl === KimiAntonelli.src
              ? "scale-105 sm:scale-110"
              : ""
          }`}
          sizes="(max-width: 640px) 68vw, 300px"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </div>
      {driver.teamLogoUrl && (
        <div className="absolute bottom-2 right-0 z-20 h-16 w-16 drop-shadow-lg md:h-20 md:w-20">
          <Image
            src={driver.teamLogoUrl}
            alt={driver.team}
            fill
            className="object-contain"
            sizes="80px"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}

function PodiumDriverCard({ driver }: { driver: PodiumDriver }) {
  const displayName = getDriverDisplayName(driver);
  const nameParts = displayName.split(/\s+/);
  const firstName = nameParts.length > 1 ? nameParts[0] : "";
  const lastName =
    nameParts.length > 1 ? nameParts.slice(1).join(" ") : displayName;
  const teamColor = driver.teamColor || "#1E293B";

  return (
    <div className="min-w-full shrink-0">
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
        style={{ backgroundColor: teamColor }}
      >
        {/* 슬라이드 배경 이름 + 드라이버 이미지 오버레이 (모바일·데스크톱 통일) */}
        <div className="relative min-h-[min(52vh,380px)] overflow-hidden sm:min-h-[420px] md:min-h-[520px] lg:min-h-[540px]">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center px-2 md:px-6">
            <div className="w-full select-none text-center">
              {firstName && (
                <p className="mb-1 text-[clamp(2rem,14vw,2.5rem)] font-bold uppercase tracking-[0.3em] text-white/30 md:text-4xl">
                  {firstName}
                </p>
              )}
              <p className="text-[clamp(4rem,24vw,4.5rem)] font-black uppercase leading-[0.72] tracking-tighter text-white/15 md:text-[clamp(5rem,10vw,7.5rem)]">
                {lastName}
              </p>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-transparent to-black/30"
            aria-hidden
          />

          <div className="absolute left-4 top-4 z-30 md:left-6 md:top-6">
            <span className="text-4xl font-black leading-none text-white drop-shadow-lg md:text-6xl lg:text-7xl">
              P{driver.position}
            </span>
          </div>

          <div className="absolute inset-0 z-20 flex items-end justify-center pb-8 sm:pb-10 md:items-center md:pb-0">
            <DriverImage driver={driver} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CancelledRaceSlide() {
  return (
    <div className="relative min-w-full shrink-0">
      <div className="relative min-h-[min(52vh,380px)] overflow-hidden rounded-2xl sm:min-h-[420px] md:min-h-[520px] lg:min-h-[540px] sm:rounded-3xl">
        <Image
          src={nullRaceBackground}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/75 to-slate-950/90"
          aria-hidden
        />
        <div className="relative z-10 flex min-h-[min(52vh,380px)] flex-col items-center justify-center gap-3 px-6 py-10 text-center sm:min-h-[420px] md:min-h-[520px] lg:min-h-[540px]">
          <p className="text-xl font-bold text-white sm:text-3xl">
            포디움 데이터 없음
          </p>
          <p className="max-w-sm text-sm text-white/70 sm:text-base">
            해당 대회는 일정에서 제외되었거나 아직 진행되지 않았습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChampionSlide() {
  return (
    <div className="relative min-w-full shrink-0">
      <div className="relative min-h-[min(52vh,380px)] overflow-hidden rounded-2xl sm:min-h-[420px] md:min-h-[520px] lg:min-h-[540px] sm:rounded-3xl">
        <Image
          src={Norris}
          alt="Lando Norris"
          fill
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-2 sm:bottom-6 sm:left-6">
          <div className="relative h-10 w-10 shrink-0 sm:h-12 sm:w-12">
            <Image
              src={McLaren}
              alt=""
              fill
              className="object-contain"
              sizes="48px"
              unoptimized
            />
          </div>
          <div>
            <p className="text-lg font-bold text-white drop-shadow sm:text-2xl">
              Lando Norris
            </p>
            <p className="text-xs font-medium text-white/80 sm:text-sm">
              2026 월드 챔피언
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DriverCardSlider({
  lastestMeeting,
  podiumData,
}: DriverCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isRaceCancelledOrExcluded =
    lastestMeeting != null && lastestMeeting.winner === null;
  const isChampionSeason = isUaeChampionSeason(lastestMeeting);
  const showSlider =
    !isRaceCancelledOrExcluded && !isChampionSeason && podiumData.length > 0;

  useEffect(() => {
    setCurrentIndex(0);
  }, [podiumData.length, isRaceCancelledOrExcluded, isChampionSeason]);

  useEffect(() => {
    if (!showSlider || podiumData.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === podiumData.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [showSlider, podiumData.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? podiumData.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === podiumData.length - 1 ? 0 : prev + 1));
  };

  if (
    !isRaceCancelledOrExcluded &&
    !isChampionSeason &&
    podiumData.length === 0
  ) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg sm:rounded-3xl">
        <div className="flex min-h-[240px] items-center justify-center px-4 py-8 sm:min-h-[320px]">
          <NotFound text="포디움 결과가 아직 없습니다." type="notFound" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: showSlider
              ? `translateX(-${currentIndex * 100}%)`
              : "translateX(0%)",
          }}
        >
          {isRaceCancelledOrExcluded ? (
            <CancelledRaceSlide />
          ) : isChampionSeason ? (
            <ChampionSlide />
          ) : (
            podiumData.map((driver) => (
              <PodiumDriverCard key={driver.position} driver={driver} />
            ))
          )}
        </div>
      </div>

      {showSlider && podiumData.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-xl bg-black/40 p-2 backdrop-blur-md transition-all hover:bg-black/60 sm:left-4 sm:p-2.5"
            aria-label="이전 드라이버"
          >
            <ChevronLeft className="text-white" size={20} />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-xl bg-black/40 p-2 backdrop-blur-md transition-all hover:bg-black/60 sm:right-4 sm:p-2.5"
            aria-label="다음 드라이버"
          >
            <ChevronRight className="text-white" size={20} />
          </button>

          <div className="mt-4 flex justify-center gap-2 sm:mt-5">
            {podiumData.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "h-2 w-7 rounded-full bg-primary"
                    : "h-2 w-2 rounded-full bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`${index + 1}번째 드라이버로 이동`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
