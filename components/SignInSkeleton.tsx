export default function SignInSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="max-w-md w-full">
        {/* Main card skeleton */}
        <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
          {/* Logo and title skeleton inside card */}
          <div className="text-center mb-8">
            <div className="inline-block">
              <div className="h-9 w-40 bg-gray-200 rounded-lg mb-2 animate-pulse mx-auto" />
            </div>
            <div className="h-5 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          {/* Google button skeleton */}
          <div className="w-full h-12 border-2 border-gray-200 rounded-xl mb-6 animate-pulse" />

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400">oder</span>
            </div>
          </div>

          {/* Email input skeleton */}
          <div className="mb-4">
            <div className="h-5 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="w-full h-12 bg-gray-100 rounded-xl animate-pulse" />
          </div>

          {/* Submit button skeleton */}
          <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse" />

          {/* Terms text skeleton */}
          <div className="text-center mt-6 space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
