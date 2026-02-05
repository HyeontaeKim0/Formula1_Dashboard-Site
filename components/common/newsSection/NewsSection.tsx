"use client";

import { Newspaper, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import type { NewsItem } from "@/lib/types/types";
import Card from "./components/card/Card";

export default function NewsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  console.log("news", news);

  return (
    <div className="relative w-full">
      {/* 헤더 섹션 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
            <Newspaper className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
              최신 뉴스
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-600">
              F1 하이라이트
            </p>
          </div>
        </div>
        <TrendingUp className="text-secondary" size={24} />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
        {loading ? (
          <div className="py-8 text-center text-sm text-gray-500">
            뉴스를 불러오는 중...
          </div>
        ) : error ? (
          <div className="py-8 text-center text-sm text-red-600">{error}</div>
        ) : (
          <div className="space-y-3">
            {/* 3개씩 그리드 형식으로 렌더링 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <div key={`${item.title}-${index}`}>
                  <Card
                    title={item.title}
                    author={item.author}
                    timeAgo={item.timeAgo}
                    image={item.image}
                    description={item.description}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
