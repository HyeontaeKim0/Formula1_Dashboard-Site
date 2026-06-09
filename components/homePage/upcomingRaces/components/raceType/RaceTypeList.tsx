import { GiF1Car } from "react-icons/gi";
import type { RaceEvent } from "@/lib/types/types";

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
      title: "프렉티스",
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
        <div key={raceType.id} className="mt-2 sm:mt-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-2.5 sm:px-4 sm:py-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full bg-gray-300" />
                <span className="truncate text-sm font-medium text-gray-500">
                  {raceType.title}
                </span>
              </div>
              <span className="shrink-0 text-xs text-gray-400">일정 없음</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={raceType.id} className="mt-3 space-y-3 sm:mt-5">
        <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm transition-all duration-300 sm:rounded-2xl sm:hover:scale-[1.01] sm:hover:border-primary/50 sm:hover:shadow-md">
          <div className="relative flex items-center justify-between gap-2 p-3 sm:p-5">
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
              <div
                className="relative flex h-12 w-12 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg shadow-md sm:h-16 sm:w-16 sm:rounded-xl"
                style={{
                  backgroundColor: hasDate ? "green" : "red",
                }}
              >
                <span className="text-[10px] font-extrabold text-white sm:text-xs">
                  {hasDate
                    ? `D-${daysUntil === 0 ? "DAY" : daysUntil}`
                    : "--"}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-1.5 sm:mb-1 sm:gap-2">
                  {event && getTypeIcon(event.type as RaceEvent["type"])}
                  <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-lg">
                    {raceType.title}
                  </h3>
                </div>
                <p className="truncate text-xs text-gray-600 sm:text-sm">
                  {event?.date} {event?.time}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:block sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-x-0 sm:group-hover:opacity-100">
              <GiF1Car size={36} className="scale-x-[-1] text-primary" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 메인 컨텐츠 */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:rounded-3xl sm:p-6">
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

        {/* <div className="mt-6 pt-5 border-t border-gray-200">
          <button className="w-full py-3.5 text-sm font-semibold text-gray-700 hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-gray-200 hover:border-primary bg-gray-50 hover:bg-primary group">
            <span className="flex items-center justify-center space-x-2">
              <span>전체 일정 보기</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
          </button>
        </div> */}
      </div>
    </>
  );
}
