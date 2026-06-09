import { Loader } from "lucide-react";
import NotFoundIcon from "../../../assets/img/error/notFound.png";

export default function NotFound({
  text,
  type,
}: {
  text: string;
  type: "loading" | "notFound";
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      {type === "loading" && (
        <Loader className="h-10 w-10 animate-spin text-primary" />
      )}
      <img
        src={NotFoundIcon.src}
        alt=""
        className="h-[120px] w-[120px] object-contain opacity-80 sm:h-[150px] sm:w-[150px]"
      />
      <span className="max-w-xs text-center text-xs font-medium text-gray-400 sm:text-sm">
        {text}
      </span>
    </div>
  );
}
