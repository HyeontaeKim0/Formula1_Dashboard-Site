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

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm">
              <CircuitBoard className="text-primary" size={20} />
            </div>
            <div>
              {isAvailable ? (
                <>
                  <p className="text-lg font-bold leading-tight">
                    {getCircuitName(circuit.circuitId)}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {circuit.circuitName}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-gray-300">Coming ...</p>
                  <p className="text-xs font-medium text-gray-300">Soon ...</p>
                </>
              )}
            </div>
          </div>
          {isAvailable && (
            <img
              src={getCountryFlagUrl(circuit.country)}
              width={44}
              height={44}
              alt={circuit.country}
              className="object-contain rounded-md shadow-sm"
            />
          )}
        </div>

        {/* 서킷 이미지 */}
        {isAvailable ? (
          <div className="mt-8 flex items-center justify-center rounded-2xl bg-gray-50/80 p-6">
            <Image
              src={getCircuitImageUrl(circuit.circuitId)}
              alt={circuit.circuitName}
              width={360}
              height={360}
              className="object-contain drop-shadow-sm"
            />
          </div>
        ) : (
          <div className="mt-8 flex h-48 items-center justify-center rounded-2xl bg-gray-50">
            <p className="text-sm font-semibold text-gray-300">
              Coming Soon ...
            </p>
          </div>
        )}

        {/* 통계 */}
        {isAvailable ? (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="flex items-start gap-6">
              <div className="shrink-0 border-r border-gray-100 pr-6">
                <LayoutFormat
                  title="First Year"
                  value={circuit.firstParticipationYear.toString()}
                  type="head"
                />
              </div>
              <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4">
                <LayoutFormat
                  title="Length"
                  value={`${circuit.circuitLength.slice(0, 1)}.${circuit.circuitLength.slice(2, 4)} km`}
                  type="body"
                />
                <LayoutFormat
                  title="Corners"
                  value={circuit.corners.toString()}
                  type="body"
                />
                <LayoutFormat
                  title="Fastest Team"
                  value={circuit.fastestLapTeamId.toString()}
                  type="body"
                />
                <LayoutFormat
                  title="Lap Record"
                  value={circuit.lapRecord.toString()}
                  type="body"
                />
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
