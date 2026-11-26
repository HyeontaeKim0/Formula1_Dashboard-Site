import { ChevronDown } from "lucide-react";
import HeaderSection from "./HeaderSection";
import { DriverResult } from "@/lib/types/types";

const tabs = [
  { id: "practice" as const, label: "프렉티스" },
  { id: "sprint" as const, label: "스프린트" },
  { id: "qualifying" as const, label: "퀄리파이" },
  { id: "race" as const, label: "레이스" },
];

type ViewType = (typeof tabs)[number]["id"];

export default function RacingTypeTabMenu({
  view,
  setView,
  lastRaceResult,
  isLoading,
}: {
  view: ViewType;
  setView: (view: ViewType) => void;
  lastRaceResult: DriverResult;
  isLoading: boolean;
}) {
  return (
    <>
      <div className="flex gap-3 items-center justify-between">
        <HeaderSection lastRaceResult={lastRaceResult} isLoading={isLoading} />
        <div className="relative  min-w-0 md:hidden">
          <select
            value={view}
            onChange={(e) => setView(e.target.value as ViewType)}
            aria-label="결과 유형"
            className="w-full appearance-none border border-rule bg-white px-4 py-3 pr-10 text-sm font-semibold text-asphalt focus:border-asphalt focus:outline-none"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            size={18}
            aria-hidden
          />
        </div>
        <div
          role="tablist"
          aria-label="결과 유형"
          className="hidden w-auto min-w-0 gap-6 border-b border-rule md:flex md:flex-nowrap"
        >
          {tabs.map((tab) => {
            const isActive = view === tab.id;

            return (
              <div>
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setView(tab.id)}
                  className={`-mb-px min-h-[40px] border-b-2 px-1 pb-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "border-asphalt text-asphalt"
                      : "border-transparent text-muted hover:text-asphalt"
                  }`}
                >
                  {tab.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
