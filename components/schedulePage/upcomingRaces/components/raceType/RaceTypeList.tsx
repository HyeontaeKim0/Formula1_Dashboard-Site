import { GiF1Car } from "react-icons/gi";
import type { RaceEvent } from "@/lib/types/types";
import { formatKst } from "@/lib/utils/dateUtils";

export default function RaceTypeList({
  freePractice1,
  freePractice2,
  freePractice3,
  qualifying,
  sprint,
  race,
  sprintQualy,
  getTypeIcon,
}: {
  freePractice1: RaceEvent[];
  freePractice2: RaceEvent[];
  freePractice3: RaceEvent[];
  qualifying: RaceEvent[];
  sprint: RaceEvent[];
  race: RaceEvent[];
  sprintQualy: RaceEvent[];
  getTypeIcon: (type: RaceEvent["type"]) => React.ReactNode;
}) {
  const getDaysUntil = (date: string) => {
    const today = new Date();
    const targetDate = new Date(date);
    const timeDifference = targetDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  // 프렉티스 2 또는 3에 일정이 있는지 확인
  const hasPractice2Or3 = !!(freePractice2[0]?.date || freePractice3[0]?.date);

  const raceTypes = [
    {
      id: "freePractice1",
      title: "프렉티스 1",
      events: freePractice1,
      defaultDaysUntil: "--",
    },
    {
      id: "freePractice2",
      title: "프렉티스 2",
      events: freePractice2,
      defaultDaysUntil: " ",
    },
    {
      id: "freePractice3",
      title: "프렉티스 3",
      events: freePractice3,
      defaultDaysUntil: " ",
    },
    {
      id: "sprintQualy",
      title: "스프린트 퀄리파이",
      events: sprintQualy,
      defaultDaysUntil: " ",
      hideWhenPracticeExists: true,
    },
    {
      id: "sprint",
      title: "스프린트",
      events: sprint,
      defaultDaysUntil: " ",
      hideWhenPracticeExists: true,
    },
    {
      id: "qualifying",
      title: "퀄리파이",
      events: qualifying,
      defaultDaysUntil: " ",
    },
    {
      id: "race",
      title: "레이스",
      events: race,
      defaultDaysUntil: "--",
    },
  ];

  const renderRaceItem = (raceType: (typeof raceTypes)[0]) => {
    const event = raceType.events[0];
    const hasDate = !!event?.date;
    const daysUntil = hasDate
      ? getDaysUntil(event.date)
      : raceType.defaultDaysUntil;

    // 일정이 없을 때 간소한 UI
    if (!hasDate) {
      return (
        <div key={raceType.id} className="col-span-2 mt-2 sm:mt-3">
          <div className="border border-white/25 px-3 py-2.5 sm:px-4 sm:py-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <div className="h-2 w-2 shrink-0 bg-white/40" />
                <span className="truncate text-sm font-medium text-white/80">
                  {raceType.title}
                </span>
              </div>
              <span className="shrink-0 text-xs text-white/60">일정 없음</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={raceType.id} className="col-span-2 contents">
        <span className="text-sm font-medium text-white">{raceType.title}</span>
        <span className="min-w-0 truncate text-xs text-white sm:text-sm">
          {formatKst(event?.date, event?.time)}
        </span>
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden sm:p-4">
      <div className="grid grid-cols-[max-content_minmax(0,1fr)] items-baseline gap-x-5 gap-y-2 sm:gap-x-8 sm:gap-y-3">
        {raceTypes
          .filter((raceType) => {
            // 프렉티스 2,3이 있고 스프린트 관련 항목이면 숨김
            if (hasPractice2Or3 && raceType.hideWhenPracticeExists) {
              return false;
            }
            // 프렉티스 2,3이 없고 스프린트 관련 항목이면 일정이 있을 때만 표시
            if (!hasPractice2Or3 && raceType.hideWhenPracticeExists) {
              return !!raceType.events[0]?.date;
            }
            return true;
          })
          .map(renderRaceItem)}
      </div>
    </div>
  );
}
