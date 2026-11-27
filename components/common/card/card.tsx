import { NewsArticle } from "@/lib/api/newsApi/newsApi";
export default function Card({ newsArticle }: { newsArticle: NewsArticle }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="w-full h-48 object-cover bg-gray-200 flex items-center justify-center">
        <img
          src={newsArticle.media.thumbnail}
          alt={newsArticle.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2>{newsArticle.title}</h2>
      </div>
    </div>
  );
}
