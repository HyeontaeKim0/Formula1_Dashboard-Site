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
      <div className="flex flex-col  justify-center gap-2">
        {type === "head" ? (
          <p className="text-md font-bold text-gray-400">{title}</p>
        ) : (
          <p className="text-sm font-bold text-gray-400">{title}</p>
        )}
        {type === "head" ? (
          <p className="text-2xl font-bold text-gray-600">{value}</p>
        ) : (
          <p className="text-xl font-bold text-gray-600">{value}</p>
        )}
      </div>
    </div>
  );
}
