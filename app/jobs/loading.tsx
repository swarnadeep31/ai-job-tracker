export default function JobsLoading() {
  return (
    <div className="p-6">
      <div className="h-8 w-40 bg-gray-200 rounded mb-6 animate-pulse" />

      {/* Filters skeleton */}
      <div className="mb-6 flex gap-3">
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Table skeleton */}
      <div className="border rounded-lg overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 border-t animate-pulse"
          >
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
