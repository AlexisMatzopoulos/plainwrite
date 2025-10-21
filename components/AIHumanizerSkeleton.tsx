export default function AIHumanizerSkeleton() {
  return (
    <section className="h-full flex flex-col">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 flex-1">
        {/* Input Panel Skeleton */}
        <div className="bg-white rounded-[16px] overflow-hidden flex flex-col h-full" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
          {/* Header */}
          <div className="p-4 flex justify-between items-center">
            <div className="h-6 bg-slate-200 rounded w-24 animate-pulse"></div>
            <div className="h-5 bg-slate-200 rounded w-32 animate-pulse"></div>
          </div>

          {/* Writing Style Selector Skeleton */}
          <div className="px-4 pb-3">
            <div className="h-4 bg-slate-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="flex gap-2 flex-wrap">
              <div className="h-10 bg-slate-200 rounded-lg w-24 animate-pulse"></div>
              <div className="h-10 bg-slate-200 rounded-lg w-24 animate-pulse"></div>
              <div className="h-10 bg-slate-200 rounded-lg w-24 animate-pulse"></div>
              <div className="h-10 bg-slate-200 rounded-lg w-24 animate-pulse"></div>
            </div>
          </div>

          {/* Text Area */}
          <div className="px-4 flex-1 relative flex" style={{ minHeight: '400px' }}>
            <div className="w-full h-full bg-slate-100 rounded animate-pulse"></div>
          </div>

          {/* Footer Button */}
          <div className="p-4 flex flex-col sm:flex-row justify-end items-start sm:items-center">
            <div className="h-9 bg-slate-200 rounded-[10px] w-48 animate-pulse"></div>
          </div>
        </div>

        {/* Output Panel Skeleton */}
        <div className="bg-white rounded-[16px] overflow-hidden flex flex-col h-full" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
          {/* Header */}
          <div className="p-4">
            <div className="h-6 bg-slate-200 rounded w-24 animate-pulse"></div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col" style={{ minHeight: '400px' }}>
            <div className="px-4 flex-1 relative flex">
              <div className="w-full h-full bg-slate-100 rounded animate-pulse"></div>
            </div>

            {/* Footer */}
            <div className="mt-auto px-4 py-3 flex justify-between items-center">
              <div className="h-5 bg-slate-200 rounded w-20 animate-pulse"></div>
              <div className="h-9 bg-slate-200 rounded-md w-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
