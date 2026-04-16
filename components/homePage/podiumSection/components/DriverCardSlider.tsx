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

type DriverCardSliderProps = {
  lastestMeeting: LastestMeeting | null;
  podiumData: PodiumDriver[];
};

export default function DriverCardSlider({
  lastestMeeting,
  podiumData,
}: DriverCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isRaceCancelledOrExcluded =
    lastestMeeting != null && lastestMeeting.winner === null;

  const isUaeChampionSeason =
    !isRaceCancelledOrExcluded &&
    lastestMeeting?.circuit?.country === "United Arab Emirates" &&
    lastestMeeting?.season === new Date().getFullYear();

  useEffect(() => {
    if (podiumData.length <= 1) return;
    if (lastestMeeting?.winner === null) return;
    if (
      lastestMeeting?.circuit?.country === "United Arab Emirates" &&
      lastestMeeting?.season === new Date().getFullYear()
    ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const podiumCount = Math.min(3, podiumData.length);
        return prevIndex === podiumCount - 1 ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [podiumData.length, lastestMeeting]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? podiumData.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === podiumData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform:
              isRaceCancelledOrExcluded || isUaeChampionSeason
                ? "translateX(0%)"
                : `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {isRaceCancelledOrExcluded ? (
            <div className="relative min-w-full flex-shrink-0">
              <div className="relative min-h-[500px] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={nullRaceBackground}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  unoptimized
                />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-950/78 to-slate-950/90"
                  aria-hidden
                />
                <div className="relative z-10 flex min-h-[700px] flex-col items-center justify-center gap-6 px-6 py-12 text-center sm:px-10">
                  <div className="max-w-lg space-y-3 drop-shadow-md">
                    {/* <h4 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                      그랑프리가 진행되지 않았습니다
                    </h4>
                    <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                      해당 대회는 일정에서 제외되었거나 취소된 것으로 보입니다.
                      포디움 결과가 없으며, 공식 캘린더·FIA 발표를 확인해
                      주세요.
                    </p> */}
                    {/* {(lastestMeeting.raceName ||
                      lastestMeeting.circuit?.country) && (
                      <p className="pt-2 text-sm font-medium text-white/60">
                        {lastestMeeting.raceName && (
                          <span className="block text-white/90">
                            {lastestMeeting.raceName}
                          </span>
                        )}
                        {lastestMeeting.circuit?.country && (
                          <span>
                            {lastestMeeting.circuit.country}
                            {lastestMeeting.circuit.city
                              ? ` · ${lastestMeeting.circuit.city}`
                              : ""}
                          </span>
                        )}
                      </p>
                    )} */}
                    <div>
                      <span className="text-white font-bold text-[55px]">
                        Coming Soon...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : isUaeChampionSeason ? (
            <>
              <div className="relative flex min-h-[500px] flex-1 flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-15">
                <Image
                  src={Norris}
                  alt="Lando Norris"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  unoptimized
                />

                <div
                  className="absolute z-20 flex items-center gap-3"
                  style={{
                    left: "74%",
                    top: "77%",
                  }}
                >
                  <div className="relative h-[50px] w-[50px]">
                    <Image
                      src={McLaren}
                      alt="McLaren Logo"
                      fill
                      className="object-contain object-center"
                      sizes="50px"
                      unoptimized
                    />
                  </div>
                  <p className="mb-2 font-bold text-white/90 drop-shadow md:text-[27px]">
                    Lando Norris
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {podiumData.map((driver) => {
                const nameParts = driver.driverName.trim().split(/\s+/);
                const firstName = nameParts.length > 1 ? nameParts[0] : "";
                const lastName =
                  nameParts.length > 1
                    ? nameParts.slice(1).join(" ")
                    : driver.driverName;

                const teamColor = driver.teamColor || "#1E293B";

                return (
                  <div
                    key={driver.position}
                    className="min-w-full flex-shrink-0"
                  >
                    <div
                      className="relative overflow-hidden rounded-3xl p-0 transition-all duration-700"
                      style={{
                        backgroundColor: teamColor,
                      }}
                    >
                      <div className="relative z-10 flex min-h-[500px] flex-col px-4 sm:px-8 md:flex-row md:items-center md:justify-between md:px-16 lg:px-24 xl:px-[200px]">
                        <>
                          <div className="flex flex-1 flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-15">
                            <div className="space-y-4">
                              {firstName && (
                                <div className="text-2xl font-bold tracking-wide text-white/90 md:text-3xl">
                                  {firstName}
                                </div>
                              )}

                              <div className="text-xl font-black leading-none tracking-tight text-white md:text-6xl lg:text-7xl">
                                {lastName}
                              </div>

                              <div className="mt-6 space-y-2">
                                <div className="flex items-center gap-3">
                                  {driver.teamLogoUrl && (
                                    <div
                                      className={`relative h-[50px] w-[50px] flex-shrink-0 ${
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
                                  <div className="relative h-[100px] w-full max-w-[400px] flex-shrink-0 sm:h-[120px] md:h-[150px]">
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

                          <div className="relative mt-4 flex w-full items-end justify-end md:mt-0 md:w-2/5">
                            {driver.imageUrl && (
                              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg">
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
                                    <div className="absolute inset-0 bg-black/20" />
                                  </div>

                                  <div className="absolute -left-2 top-2 z-20 sm:-left-3 sm:top-3 md:-left-4 md:top-4">
                                    <div className="text-4xl font-black leading-none tracking-tight text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                                      {driver.position}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {podiumData.length > 1 &&
        !isRaceCancelledOrExcluded &&
        !isUaeChampionSeason && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-2xl bg-black/40 p-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/60"
              aria-label="이전 드라이버"
            >
              <ChevronLeft className="text-white" size={28} />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-2xl bg-black/40 p-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/60"
              aria-label="다음 드라이버"
            >
              <ChevronRight className="text-white" size={28} />
            </button>
          </>
        )}

      {podiumData.length > 1 &&
        !isRaceCancelledOrExcluded &&
        !isUaeChampionSeason && (
          <div className="mt-6 flex justify-center gap-3">
            {podiumData.map((_, index) => (
              <button
                type="button"
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
  );
}
