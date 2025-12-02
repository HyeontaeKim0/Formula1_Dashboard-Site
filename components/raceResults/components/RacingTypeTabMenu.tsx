export default function RacingTypeTabMenu({
  view,
  setView,
}: {
  view: "practice" | "sprint" | "qualifying" | "race";
  setView: (view: "practice" | "sprint" | "qualifying" | "race") => void;
}) {
  return (
    <div className=" flex space-x-1 rounded-2xl bg-gray-100 p-1 border border-gray-200">
      <button
        onClick={() => setView("practice")}
        className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
          view === "practice"
            ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
        }`}
      >
        프렉티스
      </button>
      <button
        onClick={() => setView("sprint")}
        className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
          view === "sprint"
            ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
        }`}
      >
        스프린트
      </button>
      <button
        onClick={() => setView("qualifying")}
        className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
          view === "qualifying"
            ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
        }`}
      >
        퀄리파이
      </button>
      <button
        onClick={() => setView("race")}
        className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
          view === "race"
            ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
        }`}
      >
        레이스
      </button>
    </div>
  );
}
