// 일정 페이지 최초 진입 시 데이터가 오기 전에 보여주는 뼈대.
// 실제 레이아웃(헤더 → 다음 레이스 카드 + 옆 카드 → 시즌 전체 그리드)과 같은 크기로 맞춰 로딩 후 화면이 튀지 않게 한다.
const bar = " bg-rule";

export default function ScheduleSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="일정 불러오는 중">
      {/* 헤더 */}
      <div className="mb-4 sm:mb-6">
        <div className={`h-6 w-36 ${bar}`} />
        <div className={`mt-2 h-4 w-52 ${bar}`} />
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:mb-6 sm:mt-4 sm:gap-6 lg:grid-cols-3">
        {/* 다음 레이스 카드 */}
        <div className="lg:col-span-2">
          <div className=" border border-rule bg-transparent p-5  ">
            <div className="flex items-center justify-between gap-3 px-3">
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 shrink-0  bg-rule sm:h-11 sm:w-11" />
                <div className="space-y-2">
                  <div className={`h-5 w-40 ${bar}`} />
                  <div className={`h-3 w-28 ${bar}`} />
                </div>
              </div>
              <div className="m-3 h-[100px] w-[100px] shrink-0  bg-rule sm:m-6" />
            </div>
            {/* 세션 시간표 */}
            <div className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-5 gap-y-3 p-2 sm:gap-x-8 sm:p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="col-span-2 contents">
                  <div className={`h-4 w-20 ${bar}`} />
                  <div className={`h-4 w-44 max-w-full ${bar}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 옆 카드 (임시 그리드 자리) */}
        <div className="lg:col-span-1">
          <div className="h-48  bg-rule  lg:h-full" />
        </div>
      </div>

      {/* 시즌 전체 목록 */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center  border p-5"
          >
            <div className="h-[100px] w-[100px]  bg-rule" />
            <div className="mt-3 w-full space-y-2">
              <div className={`h-6 w-3/4 ${bar}`} />
              <div className={`h-4 w-1/2 ${bar}`} />
              <div className={`h-4 w-2/3 ${bar}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
