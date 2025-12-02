"use client";

import { Trophy, Medal } from "lucide-react";
import { useState } from "react";

import HeaderSection from "./components/HeaderSection";
import ConstructorSection from "./components/ConstructorSection";

export default function ChampionshipStandings() {
  const [view, setView] = useState<"drivers" | "constructors">("drivers");
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      {/* 헤더 섹션 */}
      <HeaderSection
        view={view}
        setView={setView}
        MedalIcon={Medal}
        TrophyIcon={Trophy}
      />

      {/* 메인 컨텐츠 */}
      <ConstructorSection
        view={view}
        setView={setView}
        setHoveredPosition={setHoveredPosition}
        hoveredPosition={hoveredPosition}
        MedalIcon={Medal}
        TrophyIcon={Trophy}
      />
    </div>
  );
}
