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
    <div className="bg-gradient-to-br from-dark-light to-dark rounded-xl border border-dark-lighter p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
            <Newspaper className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">최신 뉴스</h2>
            <p className="text-sm text-gray-400">F1 하이라이트</p>
          </div>
        </div>
        <TrendingUp className="text-secondary" size={20} />
      </div>

      <div className="space-y-3">
        {newsItems.map((news, index) => (
          <div
            key={index}
            className="group relative overflow-hidden bg-gradient-to-r from-dark to-dark-light rounded-lg border border-dark-lighter hover:border-primary transition-all duration-300 hover-scale cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {news.trending && (
              <div className="absolute top-2 right-2 z-10">
                <span className="text-xs px-2 py-0.5 bg-secondary/20 text-secondary rounded-full border border-secondary/30 font-medium flex items-center space-x-1">
                  <TrendingUp size={10} />
                  <span>트렌딩</span>
                </span>
              </div>
            )}

            <div className="relative p-4">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer"></div>

              <div className="relative z-10">
                <h3 className="font-semibold text-sm mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 pr-12">
                  {news.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>{news.author}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock size={12} />
                    <span>{news.timeAgo}</span>
                  </div>
                </div>
              </div>

              <ArrowRight
                size={16}
                className={`absolute bottom-4 right-4 text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${
                  hoveredIndex === index ? "scale-110" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-dark-lighter">
        <button className="w-full py-3 text-sm font-medium text-gray-300 hover:text-white bg-dark hover:bg-primary/10 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-dark-lighter hover:border-primary/50 group">
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
  );
}
