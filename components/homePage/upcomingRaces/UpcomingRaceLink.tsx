"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getNextRaces,
  type NextRacesResponse,
  type Schedule,
} from "@/lib/api/nextRacesApi/nextRacesApi";
import { getCountryFlagUrl } from "@/lib/utils/driverUtils";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

function getScheduleDate(item: unknown): string | null {
  if (!item) return null;
  if (typeof item === "string") return item;
  if (typeof item === "object" && item !== null && "date" in item) {
    const date = (item as { date?: string | null }).date;
    return date || null;
  }
  return null;
}

function formatRaceDateRange(
  schedule?: Schedule & { race?: { date?: string } },
) {
  if (!schedule) return "";

  const dateStrings = [
    getScheduleDate(schedule.fp1),
    getScheduleDate(schedule.fp2),
    getScheduleDate(schedule.fp3),
    getScheduleDate(schedule.qualy),
    getScheduleDate(schedule.sprintQualy),
    getScheduleDate(schedule.sprintRace),
    getScheduleDate(schedule.race),
  ].filter((date): date is string => Boolean(date));

  if (dateStrings.length === 0) return "";

  const timestamps = dateStrings.map((date) =>
    new Date(`${date}T00:00:00`).getTime(),
  );
  const min = new Date(Math.min(...timestamps));
  const max = new Date(Math.max(...timestamps));

  const startDay = min.getDate();
  const endDay = max.getDate();
  const month = MONTHS[max.getMonth()];

  if (startDay === endDay) return `${startDay} ${month}`;
  return `${startDay} - ${endDay} ${month}`;
}

function formatRound(round?: number) {
  if (!round) return "R--";
  return `R${String(round).padStart(2, "0")}`;
}

function getCircuitDisplayName(circuitName?: string, city?: string) {
  if (circuitName) {
    return circuitName.replace(/^Circuit de /i, "").replace(/^Circuit /i, "");
  }
  return city || "Upcoming Race";
}

export default function UpcomingRaceLink() {
  const [raceData, setRaceData] = useState<NextRacesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingRace = async () => {
      try {
        const data = await getNextRaces();
        setRaceData(data);
      } catch {
        setRaceData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingRace();
  }, []);

  const race = raceData?.race?.[0];
  const circuit = race?.circuit;
  const roundLabel = formatRound(raceData?.round);
  const dateRange = formatRaceDateRange(
    race?.schedule as Schedule & { race?: { date?: string } },
  );
  const circuitLabel = getCircuitDisplayName(
    circuit?.circuitName,
    circuit?.city,
  );
  const flagUrl = circuit?.country ? getCountryFlagUrl(circuit.country) : null;

  return (
    <Link
      href="/schedule"
      className="group relative -mx-3 mb-3 block min-w-0 overflow-hidden border-b  sm:-mx-4 sm:mb-4"
    >
      <div className="px-4 py-2 sm:px-5">
        {isLoading ? (
          <div className="animate-pulse space-y-2.5">
            <div className="h-3 w-28 rounded bg-neutral-200" />
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-5 shrink-0 rounded-full bg-neutral-200" />
              <div className="h-6 w-48 rounded bg-neutral-200" />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-700 sm:text-xs">
              <span>{roundLabel}</span>
              {dateRange && (
                <>
                  <span className="text-neutral-700">|</span>
                  <span>{dateRange}</span>
                </>
              )}
            </div>

            <div className="flex min-w-0 items-center gap-2.5">
              {flagUrl && (
                <img
                  src={flagUrl}
                  width={20}
                  height={20}
                  alt={circuit?.country ?? ""}
                  className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-neutral-200"
                />
              )}
              <div className="flex min-w-0 items-center gap-1">
                <span className="truncate text-lg font-black uppercase leading-none tracking-tight text-neutral-700 sm:text-xl">
                  {circuitLabel}
                </span>
                <ChevronRight
                  className="shrink-0 text-neutral-700 transition-transform duration-300 group-hover:translate-x-0.5"
                  size={16}
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
