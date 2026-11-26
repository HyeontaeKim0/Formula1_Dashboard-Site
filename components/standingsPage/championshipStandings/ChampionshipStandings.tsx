"use client";

import { useState } from "react";

import HeaderSection from "./components/HeaderSection";
import ConstructorSection from "./components/ConstructorSection";

export default function ChampionshipStandings() {
  const [view, setView] = useState<"drivers" | "constructors">("drivers");
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);

  return (
    <div className="relative min-w-0 w-full max-w-4xl">
      <HeaderSection view={view} setView={setView} />
      <ConstructorSection
        view={view}
        setView={setView}
        setHoveredPosition={setHoveredPosition}
        hoveredPosition={hoveredPosition}
      />
    </div>
  );
}
