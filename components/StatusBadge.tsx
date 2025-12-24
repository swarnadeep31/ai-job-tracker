export default function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Applied: "bg-blue-500/20 text-blue-400",
    Interview: "bg-yellow-500/20 text-yellow-400",
    Offer: "bg-green-500/20 text-green-400",
    Rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
        colors[status] ?? "bg-gray-500/20 text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}
