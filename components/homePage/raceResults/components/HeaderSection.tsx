import { Trophy } from "lucide-react";

export default function HeaderSection({
  lastRaceResult,
}: {
  lastRaceResult: any;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm">
        <Trophy className="text-primary" size={24} />
      </div>
      <div>
        <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
          최근 레이스 결과
        </h3>
        <p className="mt-1 text-sm font-medium text-gray-600">
          {lastRaceResult?.races?.circuit.city} · 그랑프리
        </p>
      </div>
    </div>
  );
}
