type View = "drivers" | "constructors";

const tabs: { id: View; label: string }[] = [
  { id: "drivers", label: "드라이버" },
  { id: "constructors", label: "컨스트럭터" },
];

export default function HeaderSection({
  view,
  setView,
}: {
  view: View;
  setView: (view: View) => void;
}) {
  return (
    <div className="mb-4 flex min-w-0 flex-col gap-4 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <h2 className="text-xl font-bold text-asphalt sm:text-2xl">
          챔피언십 순위
        </h2>
        <p className="mt-1 text-sm text-muted">2026 시즌</p>
      </div>
      <div
        role="tablist"
        aria-label="순위 유형"
        className="flex gap-6 border-b border-rule"
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
              className={`-mb-px min-h-[40px] border-b-2 px-1 pb-2 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? "border-asphalt text-asphalt"
                  : "border-transparent text-muted hover:text-asphalt"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
