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
    if (!hasDate && daysUntil !== "--") {
      return (
        <div key={raceType.id} className="mt-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-gray-500 font-medium">
                  {raceType.title}
                </span>
              </div>
              <span className="text-xs text-gray-400">일정 없음</span>
            </div>
          </div>
        </div>
      );
    }

    // 일정이 있을 때 기존 UI
    return (
      <div key={raceType.id} className="space-y-3 mt-5">
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer"></div>

          <div className="relative p-5 flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div
                className="flex flex-col items-center justify-center w-16 h-16 rounded-xl shadow-lg border border-white/10 relative overflow-hidden"
                style={{
                  backgroundColor: hasDate ? "green" : "red",
                }}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-xs font-extrabold text-white mb-0.5">
                    {hasDate ? `D-${daysUntil}` : "--"}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {event && getTypeIcon(event.type as RaceEvent["type"])}
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                    {raceType.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {event?.date} {event?.time}
                </p>
              </div>
            </div>
            <div className="ml-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              <GiF1Car size={40} className="text-primary scale-x-[-1]" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 메인 컨텐츠 */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
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
          <button className="w-full py-3.5 text-sm font-semibold text-gray-700 hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-gray-200 hover:border-primary bg-gradient-to-r from-gray-50 to-white hover:from-primary hover:to-primary-dark group">
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
