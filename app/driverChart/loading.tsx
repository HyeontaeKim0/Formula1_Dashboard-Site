export default function DriverChartLoading() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 드라이버 헤더 스켈레톤 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-8 w-48 bg-gray-200 rounded" />
              <div className="flex items-center gap-4">
                <div className="h-5 w-16 bg-gray-200 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded" />
                <div className="h-5 w-32 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="h-8 w-16 bg-gray-200 rounded ml-auto" />
              <div className="h-4 w-12 bg-gray-200 rounded ml-auto" />
            </div>
          </div>
          <div className="w-full h-2 rounded-full mt-4 bg-gray-200" />
        </div>

        {/* 통계 카드 스켈레톤 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-7 w-14 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* 순위 통계 스켈레톤 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-7 w-14 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* 차트 영역 스켈레톤 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
          <div className="h-80 w-full bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
