"use client";

import { Calendar, Clock, Flag, Play } from "lucide-react";
import { useState, useEffect } from "react";

import type { RaceEvent } from "@/lib/types/types";

const upcomingRaces: RaceEvent[] = [
  {
    name: "프랙티스 1",
    date: "7일 (금)",
    time: "오후 2:30",
    daysUntil: 3,
    type: "practice",
  },
  {
    name: "스프린트 퀄리파잉",
    date: "7일 (금)",
    time: "오후 6:30",
    daysUntil: 3,
    type: "qualifying",
  },
  {
    name: "스프린트",
    date: "8일 (토)",
    time: "오후 2:00",
    daysUntil: 4,
    type: "sprint",
  },
  {
    name: "퀄리파잉",
    date: "8일 (토)",
    time: "오후 6:00",
    daysUntil: 4,
    type: "qualifying",
  },
  {
    name: "레이스",
    date: "9일 (일)",
    time: "오후 5:00",
    daysUntil: 5,
    type: "race",
  },
];

const getTypeColor = (type: RaceEvent["type"]) => {
  switch (type) {
    case "race":
      return "from-primary to-primary-dark";
    case "qualifying":
      return "from-secondary to-secondary-dark";
    case "sprint":
      return "from-primary-light to-secondary";
    default:
      return "from-dark-lighter to-dark-light";
  }
};

const getTypeIcon = (type: RaceEvent["type"]) => {
  switch (type) {
    case "race":
      return <Flag className="text-primary" size={16} />;
    case "qualifying":
    case "sprint":
      return <Play className="text-secondary" size={16} />;
    default:
      return <Calendar className="text-gray-400" size={16} />;
  }
};

export default function UpcomingRaces() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-dark-light to-dark rounded-xl border border-dark-lighter p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
            <Calendar className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">다가오는 레이스</h2>
            <p className="text-sm text-gray-400">브라질 그랑프리</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400 bg-dark px-3 py-1.5 rounded-lg border border-dark-lighter">
          <Clock size={14} />
          <span className="font-mono">
            {currentTime.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {upcomingRaces.map((race, index) => (
          <div
            key={index}
            className="group relative overflow-hidden bg-gradient-to-r from-dark to-dark-light rounded-lg border border-dark-lighter hover:border-primary transition-all duration-300 hover-scale cursor-pointer"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer"></div>

            <div className="relative p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br ${getTypeColor(
                    race.type
                  )} shadow-lg border border-white/10 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-xs font-bold text-white mb-0.5">
                      D-{race.daysUntil}
                    </span>
                    <span className="text-[10px] text-white/80">
                      {race.daysUntil}일 후
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {getTypeIcon(race.type)}
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                      {race.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1.5">
                      <Calendar size={14} />
                      <span>{race.date}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock size={14} />
                      <span className="font-mono">{race.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <button className="w-full py-3 text-sm font-medium text-gray-300 hover:text-white bg-dark hover:bg-primary/10 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-dark-lighter hover:border-primary/50 group">
          <span className="flex items-center justify-center space-x-2">
            <span>전체 일정 보기</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
