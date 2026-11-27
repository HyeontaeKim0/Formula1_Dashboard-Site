import { getNews } from "@/lib/api/newsApi/newsApi";
import Card from "../common/card/card";
export default async function NewsList() {
  const news = await getNews();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl mt-10">
      {news.map((article) => (
        <div key={article.url}>
          <Card newsArticle={article} />
        </div>
      ))}
    </div>
  );
}
