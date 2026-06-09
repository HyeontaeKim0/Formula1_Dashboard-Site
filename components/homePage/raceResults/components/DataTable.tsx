import type { DriverResult } from "@/lib/types/types";
import { getTeamLogoUrl } from "@/lib/utils/driverUtils";
import { Trophy, Award, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import NotFound from "../../../common/notFound/NotFound";

type ViewType = "practice" | "sprint" | "qualifying" | "race";

const MOBILE_PREVIEW_LIMIT = 10;

function getPositionColor(position: number) {
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
}

function getTableHeaders(view: ViewType) {
  if (view === "practice") {
    return ["순위", "드라이버", "FP1", "FP2", "FP3"];
  }
  if (view === "sprint") {
    return ["순위", "드라이버", "시간", "랩", "포인트"];
  }
  if (view === "qualifying") {
    return ["순위", "드라이버", "Q1", "Q2", "Q3"];
  }
  return ["순위", "드라이버", "시간", "랩", "포인트"];
}

function PositionBadge({
  result,
}: {
  result: DriverResult & { originalPosition?: number | string };
}) {
  const displayPosition = result.originalPosition ?? result.position;
  const isNumericPosition = typeof result.originalPosition === "number";

  return (
    <div className="flex items-center gap-1">
      <span
        className={`text-sm font-bold sm:text-lg ${getPositionColor(result.position)}`}
      >
        {displayPosition}
      </span>
      {result.position === 1 && isNumericPosition && (
        <Trophy
          className={`${getPositionColor(result.position)} animate-pulse-slow`}
          size={16}
        />
      )}
      {result.position === 2 && isNumericPosition && (
        <Award className={getPositionColor(result.position)} size={16} />
      )}
      {result.position === 3 && isNumericPosition && (
        <Award className={getPositionColor(result.position)} size={16} />
      )}
    </div>
  );
}

function DriverInfo({
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
          className={`w-1 shrink-0 rounded-full ${compact ? "h-8" : "h-10 sm:h-12"}`}
          style={{ backgroundColor: result.teamColor }}
        />
      )}
      <div className="min-w-0 flex-1">
        <div
          className={`truncate font-semibold text-gray-900 ${compact ? "text-sm" : "text-xs sm:text-sm"}`}
        >
          {result.driverName}
        </div>
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-xs text-gray-500">{result.team}</span>
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

function TimeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 px-2 py-1.5 text-center">
      <div className="text-[10px] font-bold uppercase text-gray-400">{label}</div>
      <div className="mt-0.5 font-mono text-xs font-medium text-gray-800">
        {value || "-"}
      </div>
    </div>
  );
}

function MobileResultCard({
  result,
  view,
}: {
  result: DriverResult;
  view: ViewType;
}) {
  const typedResult = result as DriverResult & {
    originalPosition?: number | string;
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <div className="mt-0.5 shrink-0">
            <PositionBadge result={typedResult} />
          </div>
          <DriverInfo result={result} compact />
        </div>
        {(view === "race" || view === "sprint") && (
          <div className="shrink-0 text-right">
            <div className="text-lg font-bold text-primary">{result.points}</div>
            <div className="text-[10px] font-medium text-gray-400">PTS</div>
          </div>
        )}
      </div>

      {(view === "qualifying" || view === "practice") && (
        <div className="mt-3 grid grid-cols-3 gap-1.5">
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
      )}

      {(view === "race" || view === "sprint") && (
        <div className="mt-3 flex items-center justify-between rounded-lg bg-white px-3 py-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Clock size={13} className="text-gray-400" />
            <span className="font-mono font-medium">{result.time || "-"}</span>
          </div>
          <span className="text-xs font-semibold text-gray-500">
            {result.laps}랩
          </span>
        </div>
      )}
    </div>
  );
}

function EmptyOrLoading({
  isLoading,
  colSpan,
  mobile = false,
}: {
  isLoading: boolean;
  colSpan?: number;
  mobile?: boolean;
}) {
  const content = isLoading ? (
    <NotFound text="결과 데이터 로딩 중..." type="loading" />
  ) : (
    <NotFound text="경기가 없거나 경기 전입니다." type="notFound" />
  );

  if (mobile) {
    return <div className="py-4">{content}</div>;
  }

  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-3 text-center text-sm sm:py-4">
        {content}
      </td>
    </tr>
  );
}

export default function DataTable({
  raceResults,
  setHoveredRow,
  hoveredRow,
  view,
  isLoading,
}: {
  raceResults: DriverResult[];
  view: ViewType;
  setHoveredRow: (row: number | null) => void;
  hoveredRow: number | null;
  isLoading: boolean;
}) {
  const headers = getTableHeaders(view);
  const [showAllMobile, setShowAllMobile] = useState(false);

  useEffect(() => {
    setShowAllMobile(false);
  }, [view]);

  const mobileResults = showAllMobile
    ? raceResults
    : raceResults.slice(0, MOBILE_PREVIEW_LIMIT);
  const hasMoreMobile =
    !isLoading && raceResults.length > MOBILE_PREVIEW_LIMIT;

  return (
    <>
      {/* 모바일: 카드 리스트 (Top 10 + 더 보기) */}
      <div className="md:hidden">
        {isLoading || raceResults.length === 0 ? (
          <EmptyOrLoading isLoading={isLoading} mobile />
        ) : (
          <>
            <div className="mb-2 flex items-center justify-between px-0.5">
              <span className="text-xs font-semibold text-gray-500">
                {showAllMobile
                  ? `전체 ${raceResults.length}명`
                  : `상위 ${Math.min(MOBILE_PREVIEW_LIMIT, raceResults.length)}명`}
              </span>
            </div>
            <div className="space-y-2">
              {mobileResults.map((result, index) => (
                <MobileResultCard
                  key={`mobile-${result.position}-${index}`}
                  result={result}
                  view={view}
                />
              ))}
            </div>
            {hasMoreMobile && (
              <button
                type="button"
                onClick={() => setShowAllMobile((prev) => !prev)}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-primary/40 hover:text-primary"
              >
                {showAllMobile ? (
                  <>
                    <ChevronUp size={16} />
                    접기
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    전체 결과 보기 ({raceResults.length - MOBILE_PREVIEW_LIMIT}
                    명 더)
                  </>
                )}
              </button>
            )}
          </>
        )}
      </div>

      {/* 데스크톱: 테이블 */}
      <div className="hidden overflow-x-auto md:block md:-mx-6 md:px-6">
        <table className="w-full min-w-[480px] text-left">
          <thead>
            <tr className="border-b border-gray-200">
              {headers.map((header) => (
                <th
                  key={header}
                  className={`whitespace-nowrap px-4 py-4 text-xs font-extrabold uppercase tracking-wider text-gray-400 ${
                    header === "랩" || header === "포인트"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading || raceResults.length === 0 ? (
              <EmptyOrLoading
                isLoading={isLoading}
                colSpan={headers.length}
              />
            ) : (
              raceResults.map((result, index) => {
                const typedResult = result as DriverResult & {
                  originalPosition?: number | string;
                };

                return (
                  <tr
                    key={`${result.position}-${index}`}
                    className="relative border-b border-gray-200 transition-all duration-300"
                    onMouseEnter={() => setHoveredRow(result.position)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="px-4 py-4">
                      <PositionBadge result={typedResult} />
                    </td>
                    <td className="min-w-0 px-4 py-4">
                      <div className="flex min-w-0 items-center space-x-3">
                        {result.teamColor && (
                          <div
                            className="h-12 w-1 shrink-0 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: result.teamColor,
                              boxShadow:
                                hoveredRow === result.position
                                  ? `0 0 15px ${result.teamColor}80`
                                  : "none",
                            }}
                          />
                        )}
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-gray-900">
                            {result.driverName}
                          </div>
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="truncate text-sm text-gray-600">
                              {result.team}
                            </span>
                            {getTeamLogoUrl(
                              Number(result.driverNumber || "0"),
                            ) && (
                              <img
                                src={getTeamLogoUrl(
                                  Number(result.driverNumber || "0"),
                                )}
                                alt=""
                                className="h-[23px] w-[23px] object-contain"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    {view === "qualifying" || view === "practice" ? (
                      <>
                        <td className="px-2 py-4">
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="shrink-0 text-gray-400" />
                            <span className="font-mono text-sm">
                              {result.time || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-4">
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="shrink-0 text-gray-400" />
                            <span className="font-mono text-sm">
                              {result.time2 || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-4">
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="shrink-0 text-gray-400" />
                            <span className="font-mono text-sm">
                              {result.time3 || "-"}
                            </span>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-gray-400" />
                            <span className="font-mono text-sm">
                              {result.time || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-semibold text-gray-700">
                          {result.laps}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-lg font-bold text-primary">
                            {result.points}
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
