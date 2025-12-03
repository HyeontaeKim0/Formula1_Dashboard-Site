import type { DriverResult } from "@/lib/types/types";
import { getTeamLogoUrl } from "@/lib/utils/driverUtils";

import { Trophy, Award, Clock } from "lucide-react";

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
      return ["순위", "드라이버", "시간", "랩"];
    } else if (view === "sprint") {
      return ["순위", "드라이버", "시간", "랩", "포인트"];
    } else if (view === "qualifying") {
      return ["순위", "드라이버", "Q1", "Q2", "Q3"];
    } else if (view === "race") {
      return ["순위", "드라이버", "시간", "랩", "포인트"];
    }
  };

  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {getTableHeaders()?.map((header) => (
              <th className="text-left py-4 px-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {raceResults.map((result, index) => (
            <tr
              key={`${result.position}-${index}`}
              className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 group cursor-pointer relative"
              onMouseEnter={() => setHoveredRow(result.position)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <span
                    className={`font-bold text-lg ${getPositionColor(
                      result.position
                    )}`}
                  >
                    {(result as any).originalPosition ?? result.position}
                  </span>
                  {result.position === 1 &&
                    typeof (result as any).originalPosition === "number" && (
                      <Trophy
                        className={`${getPositionColor(
                          result.position
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
              <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                  {result.teamColor && (
                    <div
                      className="w-1.5 h-12 rounded-full transition-all duration-300 group-hover:shadow-lg"
                      style={{
                        backgroundColor: result.teamColor,
                        boxShadow:
                          hoveredRow === result.position
                            ? `0 0 15px ${result.teamColor}80`
                            : "none",
                      }}
                    ></div>
                  )}
                  <div>
                    <div className="font-semibold text-sm  text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {result.driverName}
                    </div>
                    <div className="flex items-center gap-[7px]">
                      <div className="text-sm text-gray-600 font-medium">
                        {result.team}
                      </div>
                      {getTeamLogoUrl(Number(result.driverNumber || "0")) && (
                        <div className="mt-1">
                          <img
                            src={getTeamLogoUrl(
                              Number(result.driverNumber || "0")
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
                  <td className="py-4 px-1">
                    <div className="flex items-center space-x-1.5">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-sm font-mono font-medium">
                        {result.time || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-1">
                    <div className="flex items-center space-x-1.5">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-sm font-mono font-medium">
                        {result.time2 || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-1">
                    <div className="flex items-center space-x-1.5">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-sm font-mono font-medium">
                        {result.time3 || "-"}
                      </span>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1.5">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-sm font-mono font-medium">
                        {result.time || "-"}
                      </span>
                    </div>
                  </td>
                  {view === "practice" ? (
                    ""
                  ) : (
                    <>
                      <td className="py-4 px-4 text-center text-sm text-gray-700 font-semibold">
                        {result.laps}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="font-bold text-lg text-primary">
                            {result.points}
                          </span>
                        </div>
                      </td>
                    </>
                  )}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
