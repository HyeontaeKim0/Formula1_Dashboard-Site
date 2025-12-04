import { Loader } from "lucide-react";
import NotFoundIcon from "../../assets/img/error/notFound.png";
export default function NotFound({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-x-2 mt-10">
      {/* 회전 하는 로딩 아이콘 */}
      <div className="animate-spin-slow absolute top-[115px] left-[43%] ">
        <Loader className="w-[55px] h-[55px] text-gray-400 " />
      </div>
      <img
        src={NotFoundIcon.src}
        alt="not found"
        className="w-[150px]  object-contain"
      />
      <span className="text-[12px] mt-5 font-mono font-bold text-gray-400 text-center">
        {text}
      </span>
    </div>
  );
}
