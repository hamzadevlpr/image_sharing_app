export const DownloadPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Card equivalent */}
        <div className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
          {/* CardHeader equivalent */}
          <div className="p-6 pb-0">
            {/* Image Placeholder */}
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden mb-6 shadow-inner animate-pulse"></div>
          </div>
          {/* CardContent equivalent */}
          <div className="p-6 pt-0 space-y-6">
            <div className="text-center space-y-2">
              {/* Title Placeholder */}
              <div className="h-8 w-3/4 bg-gray-200 rounded mx-auto animate-pulse"></div>
              {/* Subtitle Placeholder */}
              <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>

            {/* Password Prompt Skeleton (mimics the layout, but remains a placeholder for structural consistency) */}
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 w-3/5 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* File Info Skeletons (if password prompt is not shown) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-200 rounded-xl p-4 flex items-center space-x-3 h-20 animate-pulse"></div>
              <div className="bg-gray-200 rounded-xl p-4 flex items-center space-x-3 h-20 animate-pulse"></div>
              <div className="bg-gray-200 rounded-xl p-4 flex items-center space-x-3 h-20 animate-pulse"></div>
              <div className="bg-gray-200 rounded-xl p-4 flex items-center space-x-3 h-20 animate-pulse"></div>
            </div>

            {/* Download Button Placeholder */}
            <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>

            {/* Expiry Text Placeholder */}
            <div className="text-center text-sm bg-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-4 w-3/4 mx-auto bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-slate-500 text-sm">
          <div className="h-4 w-1/3 mx-auto bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
