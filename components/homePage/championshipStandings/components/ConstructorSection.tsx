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
}

interface StandingItem {
  position: number;
  primaryName: string;
  team: string;
  teamKey: string;
  points: number;
  wins: number;
}

function StandingRow({
  standing,
  onHover,
}: {
  standing: StandingItem;
  onHover: (position: number | null) => void;
}) {
  const displayTeam =
    standing.team === "Sauber F1 Team" ? "Audi Revolut F1 Team" : standing.team;

  return (
    <div
      className="flex items-center gap-3 border-b border-rule py-3 mx-4 sm:mx-10 transition-colors duration-200 hover:bg-white sm:gap-5 sm:py-4"
      onMouseEnter={() => onHover(standing.position)}
      onMouseLeave={() => onHover(null)}
    >
      <span
        className={`w-9 shrink-0 font-display text-2xl font-bold leading-none [font-stretch:125%] sm:w-14 sm:text-3xl ${
          standing.position <= 3 ? "text-asphalt" : "text-muted"
        }`}
      >
        {standing.position}
      </span>
      <div
        className="h-10 w-1 shrink-0 sm:h-12"
        style={{ backgroundColor: getConstructorTeamColor(standing.teamKey) }}
      />
      <img
        src={getConstructorTeamLogoUrl(standing.teamKey)}
        alt=""
        className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-asphalt sm:text-base">
          {standing.primaryName}
        </div>
        <div className="truncate text-xs text-muted sm:text-sm">
          {displayTeam}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="flex items-baseline justify-end gap-1">
          <span className="font-display text-2xl font-bold leading-none [font-stretch:125%] text-asphalt sm:text-3xl">
            {standing.points}
          </span>
          <span className="text-xs font-semibold text-muted">P</span>
        </div>
        <div className="mt-2 text-xs text-muted">{standing.wins}승</div>
      </div>
    </div>
  );
}

export default function ConstructorSection({
  view,
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
    <div className="relative min-w-0 border-t border-rule">
      {isLoading ? (
        <NotFound text="순위 데이터 로딩 중..." type="loading" />
      ) : currentData.length === 0 ? (
        <NotFound
          text="순위 데이터를 불러오지 못했거나 아직 없어요. 잠시 후 다시 시도해주세요."
          type="notFound"
        />
      ) : (
        <div>
          {currentData.map((standing) => (
            <StandingRow
              key={`${view}-${standing.position}`}
              standing={standing}
              onHover={setHoveredPosition}
            />
          ))}
        </div>
      )}
    </div>
  );
}
