export default function HeaderSection({
  lastRaceResult,
  isLoading,
}: {
  lastRaceResult: any;
  isLoading: boolean;
}) {
  const circuitCity = lastRaceResult?.races?.circuit?.city;

  return (
    <div className="flex  min-w-0 items-center gap-3 sm:gap-4">
      <div className="min-w-0">
        <h3 className="text-xl font-bold text-asphalt sm:text-2xl">
          최근 레이스 순위
        </h3>
        <p className="mt-1 break-words text-sm text-muted">
          {isLoading
            ? "데이터 로딩 중..."
            : circuitCity
              ? `${circuitCity}, ${lastRaceResult?.races?.circuit?.country}`
              : "레이스 정보 없음"}
        </p>
      </div>
    </div>
  );
}
