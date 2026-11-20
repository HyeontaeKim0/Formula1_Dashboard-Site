"use client";

import NotFound from "@/components/common/notFound/NotFound";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-16">
      <NotFound
        text="데이터를 불러오지 못했어요. 잠시 후 다시 시도해주세요."
        type="notFound"
      />
      <button
        type="button"
        onClick={reset}
        className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
      >
        다시 시도
      </button>
    </div>
  );
}
