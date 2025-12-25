import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";

import StatCard from "@/components/StatusCard";
import DashboardChart from "@/components/DashboardChart";
import MotionWrapper from "@/components/MontionWrapper";
import Section from "@/components/Section";
import { getBaseUrl } from "@/lib/getBaseUrl";

async function getStats() {
  const headersList = await headers();
  const cookie = headersList.get("cookie") ?? "";

  const res = await fetch(`${getBaseUrl()}/api/dashboard`, {
    method: "GET",
    headers: {
      Cookie: cookie,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Dashboard fetch failed:", res.status);
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json();
}

export default async function DashboardPage() {
  await getServerSession(authOptions);
  const stats = await getStats();

  return (
    <MotionWrapper>
      <Section>
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">
              Dashboard
            </h1>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard title="Total" value={stats.total} />
            <StatCard title="Applied" value={stats.applied} />
            <StatCard title="Interview" value={stats.interview} />
            <StatCard title="Offer" value={stats.offer} />
            <StatCard title="Rejected" value={stats.rejected} />
          </div>

          {/* Chart */}
          <DashboardChart />
        </div>
      </Section>
    </MotionWrapper>
  );
}
