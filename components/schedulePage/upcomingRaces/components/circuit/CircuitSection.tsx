"use client";

import type { RaceEvent } from "@/lib/types/types";
import type { NextRacesResponse } from "@/lib/api/nextRacesApi/nextRacesApi";
import {
  getCircuitImageUrl,
  getCircuitName,
  getCountryFlagUrl,
} from "@/lib/utils/driverUtils";
import Image from "next/image";

import RaceTypeList from "../raceType/RaceTypeList";

import { getNextNextRaceImageUrl } from "@/lib/utils/scheduleUtils";

export default function CircuitSection({
  upcomingRacesApi,
  freePractice1,
  freePractice2,
  freePractice3,
  qualifying,
  sprint,
  race,
  sprintQualy,
  getTypeIcon,
}: {
  upcomingRacesApi: NextRacesResponse;
  freePractice1: RaceEvent[];
  freePractice2: RaceEvent[];
  freePractice3: RaceEvent[];
  qualifying: RaceEvent[];
  sprint: RaceEvent[];
  race: RaceEvent[];
  sprintQualy: RaceEvent[];
  getTypeIcon: (type: RaceEvent["type"]) => React.ReactNode;
}) {
  const circuit = upcomingRacesApi?.race[0]?.circuit;
  const isAvailable = circuit?.circuitId !== undefined;
  // 이미지가 없는 서킷은 빈 src로 <Image>가 에러나지 않게 대체 박스를 보여줌
  // const circuitImageUrl = isAvailable
  //   ? getCircuitImageUrl(circuit.circuitId)
  //   : "";

  return (
    <div
      className=" relative overflow-hidden rounded-2xl border p-6  border-gray-200 bg-white shadow-lg sm:rounded-3xl "
      style={{
        // 이미지 중심점 기준으로 채우기
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${getNextNextRaceImageUrl(circuit?.circuitId ?? "")})`,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "multiply",
      }}
    >
      {/* 헤더 */}

      <div className="flex min-w-0   items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-4">
          {isAvailable && (
            <img
              src={getCountryFlagUrl(circuit?.country ?? "")}
              width={100}
              height={100}
              alt={circuit.country}
              className="h-auto w-full max-w-[60px] object-contain drop-shadow-sm sm:max-w-[60px]"
            />
          )}
          <div className="min-w-0">
            {isAvailable ? (
              <>
                <p className="truncate text-base font-bold leading-tight text-white sm:text-lg">
                  {getCircuitName(circuit.circuitId) || circuit.circuitName}
                </p>
                <p className="truncate text-xs font-medium text-white">
                  {circuit.circuitName}
                </p>
              </>
            ) : (
              <>
                <p className="text-base font-bold text-white sm:text-lg">
                  Coming ...
                </p>
                <p className="text-xs font-medium text-white">Soon ...</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center mt-5">
        <RaceTypeList
          freePractice1={freePractice1 || ([] as RaceEvent[])}
          freePractice2={freePractice2 || ([] as RaceEvent[])}
          freePractice3={freePractice3 || ([] as RaceEvent[])}
          qualifying={qualifying || ([] as RaceEvent[])}
          sprint={sprint || ([] as RaceEvent[])}
          race={race || ([] as RaceEvent[])}
          sprintQualy={sprintQualy || ([] as RaceEvent[])}
          getTypeIcon={getTypeIcon}
        />
      </div>
    </div>
  );
}
