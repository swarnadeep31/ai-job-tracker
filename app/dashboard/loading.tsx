export default function DashboardLoading() {
  return (
    <div className="p-6">
      <div className="h-8 w-40 bg-gray-200 rounded mb-8 animate-pulse" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl border bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
