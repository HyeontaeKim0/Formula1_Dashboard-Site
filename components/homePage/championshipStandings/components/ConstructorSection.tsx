import { getCurrentConstructorStandings } from "@/lib/api/currentCustrutor/CurrentConstrutor";
import { getCurrentDriverChampion } from "@/lib/api/currentDriverChampion/CurrentDriverChampion";
import type { ConstructorsChampionshipResponse } from "@/lib/api/currentCustrutor/CurrentConstrutor";
import type { DriverChampion } from "@/lib/api/currentDriverChampion/CurrentDriverChampion";
import { useState, useEffect } from "react";
import {
  getConstructorTeamName,
  getConstructorTeamColor,
  getConstructorTeamLogoUrl,
  getDriverChampionName,
} from "@/lib/utils/driverUtils";
import NotFound from "@/components/common/notFound/NotFound";

interface ConstructorSectionProps {
  view: "drivers" | "constructors";
  setView: (view: "drivers" | "constructors") => void;
  setHoveredPosition: (position: number | null) => void;
  hoveredPosition: number | null;
  MedalIcon: React.ElementType;
  TrophyIcon: React.ElementType;
}

interface StandingItem {
  position: number;
  primaryName: string;
  team: string;
  teamKey: string;
  points: number;
  wins: number;
}

function PositionIcon({
  position,
  MedalIcon,
  TrophyIcon,
}: {
  position: number;
  MedalIcon: React.ElementType;
  TrophyIcon: React.ElementType;
}) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
      {position === 1 && (
        <TrophyIcon className="text-primary animate-pulse-slow" size={24} />
      )}
      {position === 2 && (
        <MedalIcon className="text-gray-400" size={24} />
      )}
      {position === 3 && (
        <MedalIcon className="text-orange-600" size={24} />
      )}
      {position > 3 && (
        <span className="text-xl font-bold text-gray-400 sm:text-2xl">
          {position}
        </span>
      )}
    </div>
  );
}

function StandingCard({
  standing,
  MedalIcon,
  TrophyIcon,
  onHover,
}: {
  standing: StandingItem;
  MedalIcon: React.ElementType;
  TrophyIcon: React.ElementType;
  onHover: (position: number | null) => void;
}) {
  const displayTeam =
    standing.team === "Sauber F1 Team"
      ? "Audi Revolut F1 Team"
      : standing.team;

  return (
    <div
      className="rounded-xl border border-gray-200 bg-gray-50/40 p-3 sm:rounded-2xl sm:p-4"
      onMouseEnter={() => onHover(standing.position)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <PositionIcon
            position={standing.position}
            MedalIcon={MedalIcon}
            TrophyIcon={TrophyIcon}
          />
          <img
            src={getConstructorTeamLogoUrl(standing.teamKey)}
            alt=""
            className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-gray-900 sm:text-base">
              {standing.primaryName}
            </div>
            <div className="mt-0.5 flex min-w-0 items-center gap-1.5">
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: getConstructorTeamColor(standing.teamKey),
                }}
              />
              <span className="truncate text-xs text-gray-500 sm:text-sm">
                {displayTeam}
              </span>
            </div>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-xl font-bold text-primary sm:text-2xl">
            {standing.points}
          </div>
          <div className="text-[10px] font-medium text-gray-500 sm:text-xs">
            {standing.wins}승
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConstructorSection({
  view,
  MedalIcon,
  TrophyIcon,
  setHoveredPosition,
}: ConstructorSectionProps) {
  const [constructorStandings, setConstructorStandings] = useState<
    ConstructorsChampionshipResponse[]
  >([]);
  const [driverChampion, setDriverChampion] = useState<DriverChampion[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      setIsLoading(true);
      try {
        const [constructors, drivers] = await Promise.all([
          getCurrentConstructorStandings(),
          getCurrentDriverChampion(),
        ]);
        if (constructors) {
          setConstructorStandings(constructors);
        }
        if (drivers) {
          setDriverChampion(drivers);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchStandings();
  }, []);

  const constructorStandingData: StandingItem[] = constructorStandings.map(
    (standing) => ({
      position: standing.position,
      primaryName: getConstructorTeamName(standing.team.teamName),
      team: standing.team.teamName,
      teamKey: standing.team.teamName,
      points: standing.points,
      wins: standing.wins,
    }),
  );

  const driverStandingData: StandingItem[] = driverChampion
    ? driverChampion.map((standing) => ({
        position: standing.position,
        primaryName: getDriverChampionName(standing.driver.shortName),
        team: standing.team.teamName,
        teamKey: standing.team.teamName,
        points: standing.points,
        wins: standing.wins,
      }))
    : [];

  const currentData =
    view === "constructors" ? constructorStandingData : driverStandingData;

  return (
    <div className="relative min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-lg sm:rounded-3xl sm:p-5">
      {isLoading ? (
        <NotFound text="순위 데이터 로딩 중..." type="loading" />
      ) : currentData.length === 0 ? (
        <NotFound text="챔피언십 순위 데이터가 없습니다." type="notFound" />
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {currentData.map((standing) => (
            <StandingCard
              key={`${view}-${standing.position}`}
              standing={standing}
              MedalIcon={MedalIcon}
              TrophyIcon={TrophyIcon}
              onHover={setHoveredPosition}
            />
          ))}
        </div>
      )}
    </div>
  );
}
