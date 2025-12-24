import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";
import StatCard from "@/components/StatusCard";


async function getStats() {
  const headersList = await headers();
  const cookie = headersList.get("cookie") ?? "";

  const res = await fetch("http://localhost:3000/api/dashboard", {
    headers: { Cookie: cookie },
    cache: "no-store",
  });

  return res.json();
}

export default async function DashboardPage() {
  await getServerSession(authOptions);
  const stats = await getStats();

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-white">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard title="Total" value={stats.total} />
        <StatCard title="Applied" value={stats.applied} />
        <StatCard title="Interview" value={stats.interview} />
        <StatCard title="Offer" value={stats.offer} />
        <StatCard title="Rejected" value={stats.rejected} />
      </div>
    </div>
  );
}
