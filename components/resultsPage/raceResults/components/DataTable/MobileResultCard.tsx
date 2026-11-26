import type { DriverResult } from "@/lib/types/types";
import { getDriverHeadshotUrl } from "@/lib/utils/driverUtils";
import DriverInfo from "./DriverInfo";
import PositionBadge from "./PositionBadge";
import type { ViewType } from "./types";

function TimeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-1 py-1">
      <div className="text-[10px] font-bold uppercase text-muted">{label}</div>
      <div className="mt-0.5 font-mono text-xs font-medium text-asphalt">
        {value || "-"}
      </div>
    </div>
  );
}

export default function MobileResultCard({
  result,
  view,
}: {
  result: DriverResult;
  view: ViewType;
}) {
  const typedResult = result as DriverResult & {
    originalPosition?: number | string;
  };
  const driverImage = getDriverHeadshotUrl(result.driverCode || "");

  return (
    <div className="border-t border-rule py-4 mx-4 sm:mx-10">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="mt-0.5 shrink-0">
            <PositionBadge result={typedResult} />
          </div>
          {view === "race" && (
            <div className="shrink-0">
              <img
                src={driverImage}
                alt=""
                className="h-8 w-8 shrink-0 object-contain rounded-none"
              />
            </div>
          )}
          <DriverInfo result={result} compact />
        </div>
        {(view === "qualifying" || view === "practice") && (
          <div className="shrink-0">
            <img
              src={driverImage}
              alt=""
              className="h-10 w-10 shrink-0 object-contain rounded-none"
            />
          </div>
        )}
        {(view === "race" || view === "sprint") && (
          <div className="shrink-0 flex items-center gap-1">
            <div className="font-display text-2xl font-bold [font-stretch:125%]">
              {result.points}
            </div>
            <div className="text-[14px] font-medium text-muted">P</div>
          </div>
        )}
      </div>
      {(view === "qualifying" || view === "practice") && (
        <div className="flex justify-center">
          <div className="mt-3 grid grid-cols-3 gap-14">
            <TimeStat
              label={view === "practice" ? "FP1" : "Q1"}
              value={result.time}
            />
            <TimeStat
              label={view === "practice" ? "FP2" : "Q2"}
              value={result.time2 || ""}
            />
            <TimeStat
              label={view === "practice" ? "FP3" : "Q3"}
              value={result.time3 || ""}
            />
          </div>
        </div>
      )}

      {(view === "race" || view === "sprint") && (
        <div className="mt-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span className="font-mono font-medium">{result.time || "-"}</span>
          </div>
          <span className="text-xs font-semibold text-muted">
            {result.laps}랩
          </span>
        </div>
      )}
    </div>
  );
}
