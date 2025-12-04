"use client";

import { Clock, ArrowRight, Calendar, CircuitBoard } from "lucide-react";
import type { NextRacesResponse } from "@/lib/api/nextRacesApi/nextRacesApi";
import {
  getCircuitImageUrl,
  getDriverChampionName,
  getCircuitName,
} from "@/lib/utils/driverUtils";
import Image from "next/image";
export default function CircuitSection({
  upcomingRacesApi,
}: {
  upcomingRacesApi: NextRacesResponse;
}) {
  console.log(
    "upcomingRacesApi",
    upcomingRacesApi?.race[0]?.circuit?.circuitName
  );

  return (
    <div className="relative w-full">
      {/* 메인 컨텐츠 */}
      <div className="mt-[0px] relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
        <div className="flex gap-2 justify-start items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
            <CircuitBoard className="text-primary" size={20} />
          </div>
          <div>
            <p className="text-lg font-bold">
              {getCircuitName(upcomingRacesApi?.race[0]?.circuit?.circuitId)}
            </p>
            <p className="text-[12px] font-medium text-gray-600">
              {upcomingRacesApi?.race[0]?.circuit?.circuitName}
            </p>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center mt-10">
          <Image
            src={getCircuitImageUrl(
              upcomingRacesApi?.race[0].circuit.circuitId as string
            )}
            alt={upcomingRacesApi?.race[0].circuit.circuitName}
            width={400}
            height={400}
            className="object-cover object-center"
          />
        </div>
        <div className="mt-10 space-y-2">
          <p className="text-sm text-gray-600">
            서킷 길이 : {upcomingRacesApi?.race[0].circuit.circuitLength}
          </p>
          <p className="text-sm text-gray-600">
            코너 수 : {upcomingRacesApi?.race[0].circuit.corners}
          </p>
          <p className="text-sm text-gray-600">
            패스티스트 랩 기록 :{" "}
            {getDriverChampionName(
              upcomingRacesApi?.race[0].circuit.fastestLapDriverId as string
            )}{" "}
            / {upcomingRacesApi?.race[0].circuit.fastestLapYear}
          </p>
        </div>
      </div>
    </div>
  );
}
