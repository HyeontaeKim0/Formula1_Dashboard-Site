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
  const circuitImageUrl = isAvailable
    ? getCircuitImageUrl(circuit.circuitId)
    : "";

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-2xl border p-5 border-gray-200 bg-white shadow-lg sm:rounded-3xl ">
        {/* 헤더 */}

        <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-3 px-3">
          <div className="flex items-center gap-4">
            {isAvailable && (
              <img
                src={getCountryFlagUrl(circuit.country)}
                width={36}
                height={36}
                alt={circuit.country}
                className="h-9 w-9 shrink-0 rounded-md object-contain shadow-sm sm:h-11 sm:w-11"
              />
            )}
            <div className="min-w-0">
              {isAvailable ? (
                <>
                  <p className="truncate text-base font-bold leading-tight sm:text-lg">
                    {getCircuitName(circuit.circuitId) || circuit.circuitName}
                  </p>
                  <p className="truncate text-xs font-medium text-gray-500">
                    {circuit.circuitName}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base font-bold text-gray-300 sm:text-lg">
                    Coming ...
                  </p>
                  <p className="text-xs font-medium text-gray-300">Soon ...</p>
                </>
              )}
            </div>
          </div>
          <div className="flex items-start justify-start">
            {/* 서킷 이미지 */}
            {isAvailable && circuitImageUrl ? (
              <div className=" flex items-start justify-start rounded-xl  bg-white p-3 sm:rounded-2xl sm:p-6">
                <Image
                  src={circuitImageUrl}
                  alt={circuit.circuitName}
                  width={100}
                  height={100}
                  className="h-auto w-full max-w-[60px] object-contain drop-shadow-sm sm:max-w-[60px]"
                />
              </div>
            ) : (
              <div className="mt-4 flex h-36 items-center justify-center rounded-xl bg-gray-50 sm:mt-6 sm:h-48 sm:rounded-2xl">
                <p className="text-sm font-semibold text-gray-300">
                  Coming Soon ...
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
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
    </div>
  );
}
