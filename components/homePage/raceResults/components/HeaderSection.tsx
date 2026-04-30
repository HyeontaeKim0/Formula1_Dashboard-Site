import { Trophy } from "lucide-react";

export default function HeaderSection({
  lastRaceResult,
}: {
  lastRaceResult: any;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center backdrop-blur-sm sm:h-12 sm:w-12">
        <Trophy className="text-primary" size={24} />
      </div>
      <div className="min-w-0">
        <h3 className="text-base font-extrabold tracking-tight text-gray-900 sm:text-xl">
          최근 레이스 결과
        </h3>
        <p className="mt-1 break-words text-xs font-medium text-gray-600 sm:text-sm">
          {lastRaceResult?.races?.circuit.city} · 그랑프리
        </p>
      </div>
    </div>
  );
}
