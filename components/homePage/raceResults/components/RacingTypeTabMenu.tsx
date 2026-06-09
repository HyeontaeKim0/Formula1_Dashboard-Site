const tabs = [
  { id: "practice" as const, label: "프렉티스", shortLabel: "FP" },
  { id: "sprint" as const, label: "스프린트", shortLabel: "스프린트" },
  { id: "qualifying" as const, label: "퀄리파이", shortLabel: "퀄리" },
  { id: "race" as const, label: "레이스", shortLabel: "레이스" },
];

export default function RacingTypeTabMenu({
  view,
  setView,
}: {
  view: "practice" | "sprint" | "qualifying" | "race";
  setView: (view: "practice" | "sprint" | "qualifying" | "race") => void;
}) {
  return (
    <div className="grid w-full min-w-0 grid-cols-2 gap-1 rounded-2xl border border-gray-200 bg-gray-100 p-1 sm:flex sm:w-auto sm:flex-nowrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setView(tab.id)}
          className={`min-h-[40px] rounded-xl px-2 py-2 text-xs font-semibold transition-all duration-300 sm:flex-none sm:px-4 sm:text-sm ${
            view === tab.id
              ? "bg-primary text-white shadow-lg"
              : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
          }`}
        >
          <span className="sm:hidden">{tab.shortLabel}</span>
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
