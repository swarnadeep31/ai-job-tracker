import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") || "week";

  await connectDB();

  const now = new Date();
  let startDate = new Date();

  switch (range) {
    case "day":
      startDate.setDate(now.getDate() - 1);
      break;
    case "week":
      startDate.setDate(now.getDate() - 7);
      break;
    case "month":
      startDate.setMonth(now.getMonth() - 1);
      break;
    case "year":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  const jobs = await Job.find({
    userEmail: session.user.email,
    appliedDate: { $gte: startDate },
  });

  // Group by date
  const map: Record<string, number> = {};

  jobs.forEach((job) => {
    const date = new Date(job.appliedDate).toLocaleDateString();
    map[date] = (map[date] || 0) + 1;
  });

  const data = Object.entries(map).map(([date, count]) => ({
    date,
    count,
  }));

  return NextResponse.json(data);
}
