import Parser from "rss-parser";

const FEED_URL = "https://feeds.bbci.co.uk/sport/formula1/rss.xml";

export interface NewsArticle {
  title: string;
  content: string;
  url: string;
  media: { thumbnail: string }; // 썸네일
}

export async function getNews(): Promise<NewsArticle[]> {
  const response = await fetch(FEED_URL, { next: { revalidate: 600 } });
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  const text = await response.text();
  const parser = new Parser({
    customFields: {
      item: ["media:thumbnail"],
    },
  });
  const feed = await parser.parseString(text);
  console.log(feed.items);
  return feed.items.map((item) => ({
    title: item.title || "",
    content: item.content || "",
    url: item.link || "",
    media: { thumbnail: item["media:thumbnail"]?.$?.url || "" },
  }));
}
