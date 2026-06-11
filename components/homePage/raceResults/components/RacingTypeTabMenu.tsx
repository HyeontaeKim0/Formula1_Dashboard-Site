import { ChevronDown } from "lucide-react";

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
}: {
  view: ViewType;
  setView: (view: ViewType) => void;
}) {
  return (
    <>
      <div className="relative w-full min-w-0 md:hidden">
        <select
          value={view}
          onChange={(e) => setView(e.target.value as ViewType)}
          aria-label="결과 유형"
          className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm font-semibold text-gray-900 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
          aria-hidden
        />
      </div>

      <div
        role="tablist"
        aria-label="결과 유형"
        className="hidden w-auto min-w-0 gap-1 rounded-2xl border border-gray-200 bg-gray-100 p-1 md:flex md:flex-nowrap"
      >
        {tabs.map((tab) => {
          const isActive = view === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setView(tab.id)}
              className={`min-h-[40px] rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
