export default function HeaderSection({
  view,
  setView,
  MedalIcon,
  TrophyIcon,
}: {
  view: "drivers" | "constructors";
  setView: (view: "drivers" | "constructors") => void;
  MedalIcon: React.ElementType;
  TrophyIcon: React.ElementType;
}) {
  return (
    <div className="mb-4 flex min-w-0 flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center backdrop-blur-sm sm:h-12 sm:w-12">
          <MedalIcon className="text-primary" size={24} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-extrabold tracking-tight text-gray-900 sm:text-xl">
            챔피언십 순위
          </h3>
          <p className="mt-1 text-xs font-medium text-gray-600 sm:text-sm">
            2026 시즌
          </p>
        </div>
      </div>
      <div className="grid w-full min-w-0 grid-cols-2 gap-1 rounded-2xl border border-gray-200 bg-gray-100 p-1 sm:flex sm:w-auto sm:flex-nowrap">
        <button
          type="button"
          onClick={() => setView("drivers")}
          className={`min-h-[40px] rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 sm:flex-none sm:px-4 sm:text-sm ${
            view === "drivers"
              ? "bg-primary text-white shadow-lg"
              : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
          }`}
        >
          드라이버
        </button>
        <button
          type="button"
          onClick={() => setView("constructors")}
          className={`min-h-[40px] rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 sm:flex-none sm:px-4 sm:text-sm ${
            view === "constructors"
              ? "bg-primary text-white shadow-lg"
              : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
          }`}
        >
          컨스트럭터
        </button>
      </div>
    </div>
  );
}
