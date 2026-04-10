type CardProps = {
  title: string;
  author: string;
  timeAgo: string;
  image: string;
  description: string;
  /** 첫 기사를 신문의 ‘헤드라인’처럼 강조 */
  emphasized?: boolean;
  /** 호버 시 다른 칼럼 살짝 흐리게 */
  dimmed?: boolean;
};

function headlineText(title: string, maxLen = 100) {
  if (title.length <= maxLen) return title;
  return `${title.slice(0, maxLen).trimEnd()}…`;
}

export default function Card({
  title,
  author,
  timeAgo,
  image,
  description,
  emphasized = false,
  dimmed = false,
}: CardProps) {
  return (
    <div
      className={`flex h-full flex-col gap-3 transition-opacity duration-200 mt-5 mb-5 ${
        dimmed ? "opacity-45" : "opacity-100"
      }`}
    >
      <figure className="overflow-hidden border-2 border-neutral-900 bg-neutral-200/60">
        <img
          src={image}
          alt={headlineText(title, 120)}
          className="aspect-[16/10] w-full object-cover grayscale contrast-[1.05] transition-[filter] duration-300 group-hover:grayscale-0"
          width={400}
          height={250}
        />
      </figure>

      <div className="flex flex-1 flex-col gap-2">
        {emphasized ? (
          <span className="inline-block w-fit border-b-2 border-neutral-900 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-700">
            1면 톱기사
          </span>
        ) : null}
        <h3
          className={`font-black uppercase leading-[1.1] tracking-tight text-balance text-neutral-950 ${
            emphasized ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
          }`}
        >
          {headlineText(title)}
        </h3>
        <p
          className={`text-justify text-sm leading-relaxed text-neutral-800 ${
            emphasized ? "columns-1 gap-0 sm:columns-2 sm:gap-6" : "columns-1"
          }`}
        >
          {description}
        </p>
      </div>

      <footer className=" border-t-2 border-neutral-900 pt-2 font-sans text-[11px] text-neutral-600 mb-5">
        <p className="font-semibold uppercase tracking-wide text-neutral-800">
          {author}
        </p>
        <p className="mt-0.5 italic">{timeAgo}</p>
      </footer>
    </div>
  );
}
