export default function HistorySkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Header skeleton */}
      <div className="mb-8 text-center">
        <div className="h-10 bg-slate-200 rounded-lg w-48 mx-auto mb-2 animate-pulse"></div>
        <div className="h-6 bg-slate-200 rounded-lg w-96 mx-auto animate-pulse"></div>
      </div>

      {/* Search bar skeleton */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="h-12 bg-slate-200 rounded-[14px] animate-pulse"></div>
        </div>
      </div>

      {/* History items skeleton */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-[16px] shadow-lg overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-48 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="h-5 w-5 bg-slate-200 rounded animate-pulse"></div>
              </div>

              {/* Text content skeleton */}
              <div className="space-y-4">
                {/* Original text */}
                <div className="border border-slate-200 rounded-[10px] p-4 bg-slate-50">
                  <div className="h-5 bg-slate-200 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>

                {/* Humanized text */}
                <div className="border border-slate-200 rounded-[10px] p-4 bg-slate-50">
                  <div className="h-5 bg-slate-200 rounded w-40 mb-2 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
