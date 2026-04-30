import type { DriverResult } from "@/lib/types/types";
import { getTeamLogoUrl } from "@/lib/utils/driverUtils";
import { Trophy, Award, Clock, Loader } from "lucide-react";

import NotFound from "../../../common/notFound/NotFound";
export default function DataTable({
  raceResults,
  setHoveredRow,
  hoveredRow,
  view,
}: {
  raceResults: DriverResult[];
  view: "practice" | "sprint" | "qualifying" | "race";
  setHoveredRow: (row: number | null) => void;
  hoveredRow: number | null;
}) {
  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return "text-yellow-600";
      case 2:
        return "text-gray-600";
      case 3:
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getTableHeaders = () => {
    if (view === "practice") {
      return ["순위", "드라이버", "FP1", "FP2", "FP3"];
    } else if (view === "sprint") {
      return ["순위", "드라이버", "시간", "랩", "포인트"];
    } else if (view === "qualifying") {
      return ["순위", "드라이버", "Q1", "Q2", "Q3"];
    } else if (view === "race") {
      return ["순위", "드라이버", "시간", "랩", "포인트"];
    }
  };

  console.log("raceResults", raceResults);

  return (
    <div className="overflow-x-auto -mx-3 px-3 sm:-mx-6 sm:px-6">
      <table className="w-full min-w-[320px] text-left">
        <thead>
          <tr className="border-b border-gray-200">
            {getTableHeaders()?.map((header) =>
              // "랩","포인트"일때는 text-center
              header === "랩" || header === "포인트" ? (
                <th
                  key={header}
                  className="whitespace-nowrap px-2 py-2 text-center text-[10px] font-extrabold uppercase tracking-wider text-gray-400 sm:px-4 sm:py-4 sm:text-xs"
                >
                  {header}
                </th>
              ) : (
                <th
                  key={header}
                  className="whitespace-nowrap px-2 py-2 text-left text-[10px] font-extrabold uppercase tracking-wider text-gray-400 sm:px-4 sm:py-4 sm:text-xs"
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {raceResults.length === 0 ? (
            <tr>
              <td
                colSpan={getTableHeaders()?.length}
                className="px-4 py-3 text-center text-sm sm:py-4"
              >
                <NotFound
                  text="경기가 없거나 경기 전 혹은 데이터 수집 중 입니다....."
                  type="notFound"
                />
              </td>
            </tr>
          ) : (
            raceResults.map((result, index) => (
              <tr
                key={`${result.position}-${index}`}
                className="border-b border-gray-200 transition-all duration-300  relative"
                onMouseEnter={() => setHoveredRow(result.position)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <td className="py-2 px-2 sm:py-4 sm:px-4">
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <span
                      className={`font-bold text-base sm:text-lg ${getPositionColor(
                        result.position,
                      )}`}
                    >
                      {(result as any).originalPosition ?? result.position}
                    </span>
                    {result.position === 1 &&
                      typeof (result as any).originalPosition === "number" && (
                        <Trophy
                          className={`${getPositionColor(
                            result.position,
                          )} animate-pulse-slow`}
                          size={18}
                        />
                      )}
                    {result.position === 2 &&
                      typeof (result as any).originalPosition === "number" && (
                        <Award
                          className={getPositionColor(result.position)}
                          size={18}
                        />
                      )}
                    {result.position === 3 &&
                      typeof (result as any).originalPosition === "number" && (
                        <Award
                          className={getPositionColor(result.position)}
                          size={18}
                        />
                      )}
                  </div>
                </td>
                <td className="min-w-0 py-2 px-2 sm:py-4 sm:px-4">
                  <div className="flex min-w-0 items-center space-x-2 sm:space-x-3">
                    {result.teamColor && (
                      <div
                        className="h-10 w-1 shrink-0 rounded-full transition-all duration-300 sm:h-12"
                        style={{
                          backgroundColor: result.teamColor,
                          boxShadow:
                            hoveredRow === result.position
                              ? `0 0 15px ${result.teamColor}80`
                              : "none",
                        }}
                      ></div>
                    )}
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-gray-900 transition-colors duration-300 sm:text-sm">
                        {result.driverName}
                      </div>
                      <div className="flex min-w-0 flex-wrap items-center gap-1 sm:gap-[7px]">
                        <div className="truncate text-xs font-medium text-gray-600 sm:text-sm">
                          {result.team}
                        </div>
                        {getTeamLogoUrl(Number(result.driverNumber || "0")) && (
                          <div className="mt-1">
                            <img
                              src={getTeamLogoUrl(
                                Number(result.driverNumber || "0"),
                              )}
                              alt={`${result.team} 로고`}
                              className="h-[23px] w-[23px] object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                {view === "qualifying" ? (
                  <>
                    <td className="py-2 px-0.5 sm:py-4 sm:px-1">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} className="shrink-0 text-gray-400" />
                        <span className="font-mono text-[11px] font-medium sm:text-sm">
                          {result.time || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-0.5 sm:py-4 sm:px-1">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} className="shrink-0 text-gray-400" />
                        <span className="font-mono text-[11px] font-medium sm:text-sm">
                          {result.time2 || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-0.5 sm:py-4 sm:px-1">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} className="shrink-0 text-gray-400" />
                        <span className="font-mono text-[11px] font-medium sm:text-sm">
                          {result.time3 || "-"}
                        </span>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    {view === "practice" ? (
                      <>
                        <td className="py-2 px-0.5 sm:py-4 sm:px-1">
                          <div className="flex items-center space-x-1">
                            <Clock size={14} className="shrink-0 text-gray-400" />
                            <span className="font-mono text-[11px] font-medium sm:text-sm">
                              {result.time || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-0.5 sm:py-4 sm:px-1">
                          <div className="flex items-center space-x-1">
                            <Clock size={14} className="shrink-0 text-gray-400" />
                            <span className="font-mono text-[11px] font-medium sm:text-sm">
                              {result.time2 || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-0.5 sm:py-4 sm:px-1">
                          <div className="flex items-center space-x-1">
                            <Clock size={14} className="shrink-0 text-gray-400" />
                            <span className="font-mono text-[11px] font-medium sm:text-sm">
                              {result.time3 || "-"}
                            </span>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-2 px-2 sm:py-4 sm:px-4">
                          <div className="flex items-center space-x-1.5">
                            <Clock size={14} className="text-gray-400" />
                            <span className="font-mono text-[11px] font-medium sm:text-sm">
                              {result.time || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-2 text-center text-xs font-semibold text-gray-700 sm:py-4 sm:px-4 sm:text-sm">
                          {result.laps}
                        </td>
                        <td className="py-2 px-2 text-center sm:py-4 sm:px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-base font-bold text-primary sm:text-lg">
                              {result.points}
                            </span>
                          </div>
                        </td>
                      </>
                    )}
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
