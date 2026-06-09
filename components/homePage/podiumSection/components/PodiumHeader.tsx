import { Trophy } from "lucide-react";
import type { LastestMeeting } from "@/lib/api/lastestMeeting/lastestMeeting";

function isUaeChampionSeason(meeting: LastestMeeting | null) {
  return (
    meeting?.winner !== null &&
    meeting?.circuit?.country === "United Arab Emirates" &&
    meeting?.season === new Date().getFullYear()
  );
}

function getSubtitle(meeting: LastestMeeting | null, isLoading: boolean) {
  if (isLoading) return "데이터 로딩 중...";

  if (meeting?.winner === null) {
    return "일정 취소 또는 캘린더 제외 — 포디움 데이터 없음";
  }

  if (isUaeChampionSeason(meeting)) {
    const city = meeting?.circuit?.city;
    const country = meeting?.circuit?.country;
    return `${country}${city ? ` · ${city}` : ""} · Final Grand Prix`;
  }

  if (meeting?.circuit?.country && meeting?.circuit?.city) {
    return `${meeting.circuit.country} · ${meeting.circuit.city} 그랑프리`;
  }

  return "레이스 정보 없음";
}

function getTitle(meeting: LastestMeeting | null, isLoading: boolean) {
  if (isLoading) return "최근 레이스";
  if (isUaeChampionSeason(meeting)) {
    return `월드 챔피언 ${meeting?.season}`;
  }
  return "최근 레이스";
}

export default function PodiumHeader({
  lastestMeeting,
  isLoading,
}: {
  lastestMeeting: LastestMeeting | null;
  isLoading: boolean;
}) {
  return (
    <div className="mb-3 flex min-w-0 items-center gap-3 sm:mb-5 sm:gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
        <Trophy className="text-primary" size={24} />
      </div>
      <div className="min-w-0">
        <h3 className="text-base font-extrabold tracking-tight text-gray-900 sm:text-xl">
          {getTitle(lastestMeeting, isLoading)}
        </h3>
        <p className="mt-1 break-words text-xs font-medium text-gray-500 sm:text-sm">
          {getSubtitle(lastestMeeting, isLoading)}
        </p>
      </div>
    </div>
  );
}
