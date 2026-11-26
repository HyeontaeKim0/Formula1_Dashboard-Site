import type { DriverResult } from "@/lib/types/types";
import { getTeamLogoUrl } from "@/lib/utils/driverUtils";

export default function DriverInfo({
  result,
  compact = false,
}: {
  result: DriverResult;
  compact?: boolean;
}) {
  const logoUrl = getTeamLogoUrl(Number(result.driverNumber || "0"));

  return (
    <div className="flex min-w-0 items-center gap-2">
      {result.teamColor && (
        <div
          className={`w-1 shrink-0 rounded-none ${compact ? "h-8" : "h-10 sm:h-12"}`}
          style={{ backgroundColor: result.teamColor }}
        />
      )}
      <div className="min-w-0 flex-1">
        <div
          className={`truncate font-semibold text-asphalt ${compact ? "text-sm" : "text-xs sm:text-sm"}`}
        >
          {result.driverName}
        </div>
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-xs text-muted">{result.team}</span>
          {logoUrl && (
            <img
              src={logoUrl}
              alt=""
              className="h-4 w-4 shrink-0 object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}
