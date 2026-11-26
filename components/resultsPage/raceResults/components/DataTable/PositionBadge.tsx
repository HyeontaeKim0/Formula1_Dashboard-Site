import type { DriverResult } from "@/lib/types/types";

function getPositionColor(position: number) {
  return position <= 3 ? "text-asphalt" : "text-muted";
}

export default function PositionBadge({
  result,
}: {
  result: DriverResult & { originalPosition?: number | string };
}) {
  const displayPosition = result.originalPosition ?? result.position;

  return (
    <div className="flex items-center gap-1">
      <span
        className={`font-display text-2xl font-bold leading-none [font-stretch:125%] sm:text-3xl ${getPositionColor(result.position)}`}
      >
        {displayPosition}
      </span>
    </div>
  );
}
