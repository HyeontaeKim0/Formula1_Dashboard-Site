export default function LayoutFormat({
  title,
  value,
  type,
}: {
  title: string;
  value: string;
  type: "head" | "body";
}) {
  return (
    <div className="flex flex-col">
      <p
        className={`font-semibold uppercase tracking-wider text-gray-400 ${
          type === "head" ? "text-[11px]" : "text-[10px]"
        }`}
      >
        {title}
      </p>
      <p
        className={`mt-1 font-extrabold leading-tight ${
          type === "head"
            ? "text-3xl text-gray-800"
            : "text-sm text-gray-700"
        }`}
      >
        {value}
      </p>
      {type === "head" && (
        <div className="mt-2.5 h-0.5 w-8 rounded-full bg-primary/40" />
      )}
    </div>
  );
}
