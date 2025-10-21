export default function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Account and Balance Cards - 2 Column Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Account Card Skeleton */}
        <div className="border text-card-foreground bg-white rounded-[16px] shadow-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-7 bg-slate-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="h-10 bg-slate-200 rounded w-28 animate-pulse"></div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div>
                <div className="h-4 bg-slate-200 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-6 bg-slate-200 rounded w-40 animate-pulse"></div>
              </div>
              <div>
                <div className="h-4 bg-slate-200 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-6 bg-slate-200 rounded w-56 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Card Skeleton */}
        <div className="border text-card-foreground bg-white rounded-[16px] shadow-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-6 bg-slate-200 rounded w-28 animate-pulse"></div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="h-10 bg-slate-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-full mb-4 animate-pulse"></div>
            <div className="h-14 bg-slate-200 rounded-[10px] w-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Purchase History Card Skeleton */}
      <div className="border text-card-foreground mb-8 bg-white rounded-[16px] shadow-lg">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="h-5 bg-slate-200 rounded w-64 animate-pulse"></div>
        </div>
      </div>

      {/* Subscription Card Skeleton */}
      <div className="border text-card-foreground bg-white rounded-[16px] shadow-lg">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-6 bg-slate-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="h-10 bg-slate-200 rounded w-40 mb-4 animate-pulse"></div>
          <div className="h-5 bg-slate-200 rounded w-56 mb-4 animate-pulse"></div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="h-14 bg-slate-200 rounded-[10px] w-full md:w-48 animate-pulse"></div>
            <div className="h-14 bg-slate-200 rounded-[10px] w-full md:w-48 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
