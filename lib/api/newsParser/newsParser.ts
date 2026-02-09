import Parser from "rss-parser";
import type { NewsItem } from "@/lib/types/types";

const parser = new Parser();

const FEEDS = [
  "https://www.formula1.com/en/latest/all.xml",
  "https://www.motorsport.com/rss/f1/news/",
];

function getTimeAgo(pubDate: string): string {
  const date = new Date(pubDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "방금 전";
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  return `${Math.floor(diffDays / 30)}개월 전`;
}

type RssItem = {
  title?: string;
  pubDate?: string;
  creator?: string;
  description?: string;
};

export async function getNews(): Promise<NewsItem[]> {
  const feedPromises = FEEDS.map((url) => parser.parseURL(url));
  const results = await Promise.all(feedPromises);

  const withSource = results.flatMap((feed) =>
    (feed.items ?? []).map((item) => ({
      ...item,
      source: feed.title,
      url: feed.link,
      image: feed.enclosure?.url ?? "",
    })),
  );

  withSource.sort(
    (a, b) =>
      new Date(b.pubDate ?? 0).getTime() - new Date(a.pubDate ?? 0).getTime(),
  );

  return withSource.slice(0, 20).map((item) => {
    const rss = item as RssItem;

    return {
      title: rss.title ?? "",
      author: rss.creator ?? (item as { source?: string }).source ?? "F1 News",
      timeAgo: getTimeAgo(rss.pubDate ?? ""),
      url: item.link ?? "",
      image: item.enclosure?.url ?? "",
      description: rss.description ?? "",
    };
  });
}
