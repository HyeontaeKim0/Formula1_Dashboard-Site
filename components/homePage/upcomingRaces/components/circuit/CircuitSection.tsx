"use client";

import { CircuitBoard } from "lucide-react";
import type { NextRacesResponse } from "@/lib/api/nextRacesApi/nextRacesApi";
import {
  getCircuitImageUrl,
  getCircuitName,
  getCountryFlagUrl,
} from "@/lib/utils/driverUtils";
import Image from "next/image";
import LayoutFormat from "@/components/common/layoutFormat/LayoutFormat";

export default function CircuitSection({
  upcomingRacesApi,
}: {
  upcomingRacesApi: NextRacesResponse;
}) {
  const circuit = upcomingRacesApi?.race[0]?.circuit;
  const isAvailable = circuit?.circuitId !== undefined;
  // 이미지가 없는 서킷은 빈 src로 <Image>가 에러나지 않게 대체 박스를 보여줌
  const circuitImageUrl = isAvailable
    ? getCircuitImageUrl(circuit.circuitId)
    : "";
  // 서킷 상세는 API가 제공하지 않을 수 있어 모두 있을 때만 통계를 보여줌
  const stats =
    circuit?.firstParticipationYear !== undefined &&
    circuit.circuitLength !== undefined &&
    circuit.corners !== undefined &&
    circuit.fastestLapTeamId !== undefined &&
    circuit.lapRecord !== undefined
      ? {
          firstParticipationYear: circuit.firstParticipationYear,
          circuitLength: circuit.circuitLength,
          corners: circuit.corners,
          fastestLapTeamId: circuit.fastestLapTeamId,
          lapRecord: circuit.lapRecord,
        }
      : null;

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:rounded-3xl sm:p-6">
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10">
              <CircuitBoard className="text-primary" size={20} />
            </div>
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
          {isAvailable && (
            <img
              src={getCountryFlagUrl(circuit.country)}
              width={36}
              height={36}
              alt={circuit.country}
              className="h-9 w-9 shrink-0 rounded-md object-contain shadow-sm sm:h-11 sm:w-11"
            />
          )}
        </div>

        {/* 서킷 이미지 */}
        {isAvailable && circuitImageUrl ? (
          <div className="mt-4 flex items-center justify-center rounded-xl bg-gray-50/80 p-3 sm:mt-6 sm:rounded-2xl sm:p-6">
            <Image
              src={circuitImageUrl}
              alt={circuit.circuitName}
              width={360}
              height={360}
              className="h-auto w-full max-w-[280px] object-contain drop-shadow-sm sm:max-w-[360px]"
            />
          </div>
        ) : (
          <div className="mt-4 flex h-36 items-center justify-center rounded-xl bg-gray-50 sm:mt-6 sm:h-48 sm:rounded-2xl">
            <p className="text-sm font-semibold text-gray-300">
              Coming Soon ...
            </p>
          </div>
        )}

        {/* 통계 */}
        {stats ? (
          <div className="mt-4 border-t border-gray-100 pt-4 sm:mt-6 sm:pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
              <div className="shrink-0 rounded-xl bg-gray-50 px-4 py-3 sm:rounded-none sm:border-r sm:border-gray-100 sm:bg-transparent sm:px-0 sm:py-0 sm:pr-6">
                <LayoutFormat
                  title="First Year"
                  value={stats.firstParticipationYear.toString()}
                  type="head"
                />
              </div>
              <div className="grid flex-1 grid-cols-2 gap-2 sm:gap-x-6 sm:gap-y-4">
                {(
                  [
                    {
                      title: "Length",
                      value: `${stats.circuitLength} km`,
                    },
                    {
                      title: "Corners",
                      value: stats.corners.toString(),
                    },
                    {
                      title: "Fastest Team",
                      value: stats.fastestLapTeamId.toString(),
                    },
                    {
                      title: "Lap Record",
                      value: stats.lapRecord.toString(),
                    },
                  ] as const
                ).map((stat) => (
                  <div
                    key={stat.title}
                    className="min-w-0 rounded-xl bg-gray-50 px-3 py-2.5 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0"
                  >
                    <LayoutFormat
                      title={stat.title}
                      value={stat.value}
                      type="body"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-center border-t border-gray-100 pt-6">
            <p className="text-sm font-semibold text-gray-300">
              Coming Soon ...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
