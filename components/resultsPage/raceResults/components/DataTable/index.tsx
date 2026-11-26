import type { DriverResult } from "@/lib/types/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import DesktopResultRow from "./DesktopResultRow";
import EmptyOrLoading from "@/components/common/emptyOrLoading/EmptyOrLoading";
import MobileResultCard from "./MobileResultCard";
import type { ViewType } from "./types";

const MOBILE_PREVIEW_LIMIT = 10;

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
  const hasMoreMobile = !isLoading && raceResults.length > MOBILE_PREVIEW_LIMIT;

  return (
    <>
      {/* 모바일: 카드 리스트 (Top 10 + 더 보기) */}
      <div className="md:hidden">
        {isLoading || raceResults.length === 0 ? (
          <EmptyOrLoading isLoading={isLoading} mobile />
        ) : (
          <>
            <div>
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
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-none border border-rule bg-white py-2.5 text-sm font-semibold text-muted transition-colors hover:border-asphalt hover:text-asphalt"
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
            <tr className="border-b border-rule">
              {headers.map((header) => (
                <th
                  key={header}
                  className={`whitespace-nowrap px-4 py-4 text-xs font-semibold text-muted ${
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
              <EmptyOrLoading isLoading={isLoading} colSpan={headers.length} />
            ) : (
              raceResults.map((result, index) => (
                <DesktopResultRow
                  key={`${result.position}-${index}`}
                  result={result}
                  view={view}
                  setHoveredRow={setHoveredRow}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
