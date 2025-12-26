import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";

import StatCard from "@/components/StatusCard";
import DashboardChart from "@/components/DashboardChart";
import MotionWrapper from "@/components/MontionWrapper";
import Section from "@/components/Section";

async function getStats() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  const jobs = await Job.find({ userEmail: session.user.email });

  return {
    total: jobs.length,
    applied: jobs.filter(j => j.status === "Applied").length,
    interview: jobs.filter(j => j.status === "Interview").length,
    offer: jobs.filter(j => j.status === "Offer").length,
    rejected: jobs.filter(j => j.status === "Rejected").length,
  };
}

export default async function DashboardPage() {
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
