type CardProps = {
  title: string;
  author: string;
  timeAgo: string;
  image: string;
  description: string;
};

export default function Card({
  title,
  author,
  timeAgo,
  image,
  description,
}: CardProps) {
  return (
    <div className="flex flex-col  items-center gap-5 border border-gray-200 rounded-lg p-4">
      <img src={image} alt={title} width={400} />
      <h1 className="text-lg font-bold">{title.slice(0, 100)}...</h1>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="text-sm text-gray-500">{author}</p>
      <p className="text-sm text-gray-500">{timeAgo}</p>
    </div>
  );
}
