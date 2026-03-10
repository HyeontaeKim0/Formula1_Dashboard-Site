"use client";

import { Clock, ArrowRight, Calendar, CircuitBoard } from "lucide-react";
import type { NextRacesResponse } from "@/lib/api/nextRacesApi/nextRacesApi";
import {
  getCircuitImageUrl,
  getCircuitName,
  getConstructorTeamLogoUrl,
  getConstructorTeamColor,
  getCountryFlagUrl,
  getDriverHeadshotUrl,
} from "@/lib/utils/driverUtils";
import Image from "next/image";
import LayoutFormat from "@/components/common/layoutFormat/LayoutFormat";
export default function CircuitSection({
  upcomingRacesApi,
}: {
  upcomingRacesApi: NextRacesResponse;
}) {
  console.log(
    "upcomingRacesApi",
    upcomingRacesApi?.race[0]?.circuit?.circuitName,
  );

  const color = getConstructorTeamColor(
    upcomingRacesApi?.race[0]?.circuit?.fastestLapTeamId as string,
  );

  console.log("upcomingRacesApi", upcomingRacesApi);

  return (
    <div className="relative w-full">
      {/* 메인 컨텐츠 */}
      <div className="mt-[0px] relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
        <div>
          <div className="flex gap-2 justify-between items-center px-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10  items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm">
                <CircuitBoard className="text-primary" size={20} />
              </div>
              <div>
                {upcomingRacesApi?.race[0]?.circuit?.circuitId === undefined ? (
                  <p className="text-lg font-bold text-gray-400">Comming ...</p>
                ) : (
                  <p className="text-lg font-bold">
                    {getCircuitName(
                      upcomingRacesApi?.race[0]?.circuit?.circuitId,
                    )}
                  </p>
                )}
                {upcomingRacesApi?.race[0]?.circuit?.circuitName ===
                undefined ? (
                  <p className="text-[12px] font-bold text-gray-400">
                    Soon ...
                  </p>
                ) : (
                  <p className="text-[12px] font-medium text-gray-600">
                    {upcomingRacesApi?.race[0]?.circuit?.circuitName}
                  </p>
                )}
              </div>
            </div>
            <div>
              <img
                src={getCountryFlagUrl(
                  upcomingRacesApi?.race[0]?.circuit?.country as string,
                )}
                width={50}
                height={50}
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
        {upcomingRacesApi?.race[0]?.circuit?.circuitId === undefined ? (
          <div className="w-full h-full flex items-center justify-center mt-10">
            <p className=" text-gray-400 font-bold">Comming Soon ...</p>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center mt-10">
            <Image
              src={getCircuitImageUrl(
                upcomingRacesApi?.race[0].circuit.circuitId as string,
              )}
              alt={upcomingRacesApi?.race[0].circuit.circuitName}
              width={400}
              height={400}
              className="object-cover object-center"
            />
          </div>
        )}
        {upcomingRacesApi?.race[0]?.circuit?.circuitId === undefined ? (
          <div className="w-full flex items-center justify-center mt-10">
            <p className="text-gray-400 font-bold">Comming Soon ...</p>
          </div>
        ) : (
          <div className="mt-10 px-5 flex gap-10">
            <div className="flex items-center gap-5">
              <LayoutFormat
                title={"First Year"}
                value={upcomingRacesApi?.race[0].circuit.firstParticipationYear.toString()}
                type={"head"}
              />
            </div>
            <div className="w-full">
              <div className="flex items-center gap-[50px] mt-6">
                <LayoutFormat
                  title={"Length"}
                  type={"body"}
                  value={`${upcomingRacesApi?.race[0].circuit.circuitLength.slice(0, 1)}.${upcomingRacesApi?.race[0].circuit.circuitLength.slice(2, 4)} km`}
                />

                <LayoutFormat
                  title={"Corners"}
                  value={upcomingRacesApi?.race[0].circuit.corners.toString()}
                  type={"body"}
                />
              </div>
              <div className="flex items-center gap-10 mt-5 ">
                <LayoutFormat
                  title={"Fastest Team"}
                  value={upcomingRacesApi?.race[0].circuit.fastestLapTeamId.toString()}
                  type={"body"}
                />
                <LayoutFormat
                  title={"Lap Record"}
                  value={upcomingRacesApi?.race[0].circuit.lapRecord.toString()}
                  type={"body"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
