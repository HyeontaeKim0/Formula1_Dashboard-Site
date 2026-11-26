import type { DriverResult } from "@/lib/types/types";
import { getDriverHeadshotUrl, getTeamLogoUrl } from "@/lib/utils/driverUtils";
import PositionBadge from "./PositionBadge";
import type { ViewType } from "./types";

export default function DesktopResultRow({
  result,
  view,
  setHoveredRow,
}: {
  result: DriverResult;
  view: ViewType;
  setHoveredRow: (row: number | null) => void;
}) {
  const typedResult = result as DriverResult & {
    originalPosition?: number | string;
  };
  const driverImage = getDriverHeadshotUrl(result.driverCode || "");

  return (
    <tr
      className="relative border-b border-rule transition-colors duration-200"
      onMouseEnter={() => setHoveredRow(result.position)}
      onMouseLeave={() => setHoveredRow(null)}
    >
      <td className="px-4 py-4">
        <PositionBadge result={typedResult} />
      </td>
      <td className="min-w-0 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <img
              src={driverImage}
              alt=""
              className="h-11 w-11 shrink-0 object-contain rounded-none"
            />
          </div>
          <div className="flex min-w-0 items-center space-x-3">
            {result.teamColor && (
              <div
                className="h-12 w-1 shrink-0 rounded-none transition-colors duration-200"
                style={{
                  backgroundColor: result.teamColor,
                }}
              />
            )}
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-asphalt">
                {result.driverName}
              </div>
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate text-sm text-muted">
                  {result.team}
                </span>
                {getTeamLogoUrl(Number(result.driverNumber || "0")) && (
                  <img
                    src={getTeamLogoUrl(Number(result.driverNumber || "0"))}
                    alt=""
                    className="h-[23px] w-[23px] object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </td>
      {view === "qualifying" || view === "practice" ? (
        <>
          <td className="px-2 py-4">
            <div className="flex items-center gap-1">
              <span className="font-mono text-sm">{result.time || "-"}</span>
            </div>
          </td>
          <td className="px-2 py-4">
            <div className="flex items-center gap-1">
              <span className="font-mono text-sm">{result.time2 || "-"}</span>
            </div>
          </td>
          <td className="px-2 py-4">
            <div className="flex items-center gap-1">
              <span className="font-mono text-sm">{result.time3 || "-"}</span>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="px-4 py-4">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm">{result.time || "-"}</span>
            </div>
          </td>
          <td className="px-4 py-4 text-center text-sm font-semibold text-muted">
            {result.laps}
          </td>
          <td className="px-4 py-4 text-center">
            <span className="font-display text-2xl font-bold [font-stretch:125%]">
              {result.points}
            </span>
          </td>
        </>
      )}
    </tr>
  );
}
