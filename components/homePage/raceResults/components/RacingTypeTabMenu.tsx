export default function RacingTypeTabMenu({
  view,
  setView,
}: {
  view: "practice" | "sprint" | "qualifying" | "race";
  setView: (view: "practice" | "sprint" | "qualifying" | "race") => void;
}) {
  return (
    <div className="flex w-full min-w-0 flex-wrap gap-1 rounded-2xl border border-gray-200 bg-gray-100 p-1 sm:w-auto sm:flex-nowrap">
      <button
        onClick={() => setView("practice")}
        className={`min-h-[40px] flex-1 rounded-xl px-2 py-1.5 text-xs font-semibold transition-all duration-300 sm:flex-none sm:px-4 sm:py-2 sm:text-sm ${
          view === "practice"
            ? "bg-primary text-white shadow-lg "
            : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        }`}
      >
        프렉티스
      </button>
      <button
        onClick={() => setView("sprint")}
        className={`min-h-[40px] flex-1 rounded-xl px-2 py-1.5 text-xs font-semibold transition-all duration-300 sm:flex-none sm:px-4 sm:py-2 sm:text-sm ${
          view === "sprint"
            ? "bg-primary text-white shadow-lg "
            : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        }`}
      >
        스프린트
      </button>
      <button
        onClick={() => setView("qualifying")}
        className={`min-h-[40px] flex-1 rounded-xl px-2 py-1.5 text-xs font-semibold transition-all duration-300 sm:flex-none sm:px-4 sm:py-2 sm:text-sm ${
          view === "qualifying"
            ? "bg-primary text-white shadow-lg "
            : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        }`}
      >
        퀄리파이
      </button>
      <button
        onClick={() => setView("race")}
        className={`min-h-[40px] flex-1 rounded-xl px-2 py-1.5 text-xs font-semibold transition-all duration-300 sm:flex-none sm:px-4 sm:py-2 sm:text-sm ${
          view === "race"
            ? "bg-primary text-white shadow-lg "
            : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        }`}
      >
        레이스
      </button>
    </div>
  );
}
