"use client";

import { Newspaper, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { useState } from "react";

import type { NewsItem } from "@/lib/types/types";

const newsItems: NewsItem[] = [
  {
    title: "브라질 그랑프리 전 F1 드라이버들의 근황",
    author: "F1 News",
    timeAgo: "11일 전",
    trending: true,
  },
  {
    title: "F1 2025 - 멕시코 그랑프리 서킷 소개 및 프리뷰",
    author: "시케인",
    timeAgo: "11일 전",
  },
  {
    title:
      "[ 케로군의 쇼츠 ] 한국인 최초 F3 진출, 그 무대의 경쟁 수준은? (신우현 선수)",
    author: "Jesus Yoon",
    timeAgo: "12일 전",
    trending: true,
  },
  {
    title: "막스 일대기 Chapter.2 [F1 2025시즌 멕시코시티 그랑프리 프리뷰]",
    author: "크레이지포뮬러",
    timeAgo: "12일 전",
  },
  {
    title:
      "[ 케로군의 그랑프리 프리뷰 ] R20 F1 멕시코시티 그랑프리 2025 프리뷰(요약)",
    author: "Jesus Yoon",
    timeAgo: "12일 전",
  },
];

export default function NewsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
            <p className="mt-1 text-sm font-medium text-gray-600">F1 하이라이트</p>
          </div>
        </div>
        <TrendingUp className="text-secondary" size={24} />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
        <div className="space-y-3">
          {newsItems.map((news, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-md"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {news.trending && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-xs px-2.5 py-1 bg-secondary/20 text-secondary rounded-full border border-secondary/30 font-semibold flex items-center gap-1.5">
                    <TrendingUp size={10} />
                    <span>트렌딩</span>
                  </span>
                </div>
              )}

              <div className="relative p-5">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer"></div>

                <div className="relative z-10">
                  <h3 className="font-semibold text-sm mb-3 line-clamp-2 text-gray-900 group-hover:text-primary transition-colors duration-300 pr-12">
                    {news.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="font-medium">{news.author}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock size={12} />
                      <span className="font-medium">{news.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <ArrowRight
                  size={16}
                  className={`absolute bottom-5 right-5 text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${
                    hoveredIndex === index ? "scale-110" : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-gray-200">
          <button className="w-full py-3.5 text-sm font-semibold text-gray-700 hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-gray-200 hover:border-primary bg-gradient-to-r from-gray-50 to-white hover:from-primary hover:to-primary-dark group">
            <span className="flex items-center justify-center space-x-2">
              <span>더 많은 뉴스 보기</span>
              <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
