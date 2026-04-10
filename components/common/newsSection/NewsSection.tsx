"use client";

import { Newspaper, TrendingUp } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import type { NewsItem } from "@/lib/types/types";
import Card from "./components/card/Card";

export default function NewsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mastheadDate = useMemo(() => {
    return new Intl.DateTimeFormat("ko-KR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date());
  }, []);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => {
        if (!res.ok) throw new Error("뉴스를 불러오지 못했습니다.");
        return res.json();
      })
      .then((data: NewsItem[]) => setNews(Array.isArray(data) ? data : []))
      .catch(() => setError("뉴스를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative w-full font-serif text-neutral-900">
      {/* 신문지 배경 + 미세 수직 룰 (CodePen의 newsprint 느낌) */}
      <div
        className="border-[3px] border-double border-neutral-900 shadow-[4px_4px_0_0_rgba(0,0,0,0.08)]"
        style={{
          backgroundColor: "#f4f1ea",
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 31px,
            rgba(0,0,0,0.04) 31px,
            rgba(0,0,0,0.04) 32px
          )`,
        }}
      >
        {/* 상단 메타 바 */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-900 px-4 py-2 text-[10px] font-sans uppercase tracking-[0.2em] text-neutral-700 sm:px-6 sm:text-xs">
          <span className="text-center font-medium">{mastheadDate}</span>
        </div>

        {/* 머스트헤드 */}
        <header className="border-b-2 border-neutral-900 px-4 py-6 text-center sm:px-8 sm:py-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3">
            <div
              className="flex items-center gap-2 border-y border-neutral-900 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-600 sm:text-xs"
              aria-hidden
            >
              <Newspaper className="h-4 w-4 text-neutral-800" />
              포뮬라 완
            </div>
            <h2 className="font-black uppercase leading-none tracking-tight text-neutral-950 sm:tracking-tighter">
              <span className="block text-3xl sm:text-5xl md:text-6xl">
                더 패독
              </span>
              <span className="mt-1 block font-serif text-2xl font-bold normal-case tracking-normal text-neutral-800 sm:text-3xl">
                타임즈
              </span>
            </h2>
            <p className="max-w-xl font-sans text-xs font-medium leading-relaxed text-neutral-600 sm:text-sm">
              - 번역은 알아서 하는걸로 합시다. -
            </p>
          </div>
        </header>

        {/* 본문 영역 */}
        <div className="px-4 py-6 sm:px-6 sm:py-8">
          {loading ? (
            <p className="py-10 text-center font-sans text-sm italic text-neutral-600">
              뉴스판을 인쇄하는 중입니다…
            </p>
          ) : error ? (
            <p className="py-10 text-center font-sans text-sm font-medium text-red-800">
              {error}
            </p>
          ) : news.length === 0 ? (
            <p className="py-10 text-center font-sans text-sm italic text-neutral-600">
              오늘은 기사가 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-0 border-y-2 border-neutral-900 lg:grid-cols-3 lg:divide-x lg:divide-neutral-900/25 mb-5 ">
              {news.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="group min-h-0 border-t-2 border-neutral-900/20 bg-transparent pt-6 first:border-t-0 first:pt-0 lg:border-t-0 lg:px-4 lg:pt-0 mb-5"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card
                    title={item.title}
                    author={item.author}
                    timeAgo={item.timeAgo}
                    image={item.image}
                    description={item.description}
                    emphasized={index === 0}
                    dimmed={hoveredIndex !== null && hoveredIndex !== index}
                  />
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="border-t-2 border-neutral-900 px-4 py-2 text-center font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
          패독 타임즈
        </div>
      </div>
    </div>
  );
}
