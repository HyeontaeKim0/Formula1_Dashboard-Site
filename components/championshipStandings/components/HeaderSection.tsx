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
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
          <MedalIcon className="text-primary" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
            챔피언십 순위
          </h3>
          <p className="mt-1 text-sm font-medium text-gray-600">2025 시즌</p>
        </div>
      </div>
      <div className="flex space-x-1 rounded-2xl bg-gray-100 p-1 border border-gray-200">
        <button
          onClick={() => setView("drivers")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
            view === "drivers"
              ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
          }`}
        >
          드라이버
        </button>
        <button
          onClick={() => setView("constructors")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
            view === "constructors"
              ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
          }`}
        >
          컨스트럭터
        </button>
      </div>
    </div>
  );
}
