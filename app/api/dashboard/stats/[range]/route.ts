import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import dayjs from "dayjs";

export async function GET(
  req: Request,
  context: { params: Promise<{ range: string }> }
) {
  const { range } = await context.params; // ✅ Next.js 15 FIX

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  let startDate = dayjs();

  switch (range) {
    case "day":
      startDate = startDate.subtract(1, "day");
      break;
    case "week":
      startDate = startDate.subtract(7, "day");
      break;
    case "month":
      startDate = startDate.subtract(1, "month");
      break;
    case "year":
      startDate = startDate.subtract(1, "year");
      break;
    default:
      return NextResponse.json({ error: "Invalid range" }, { status: 400 });
  }

  const jobs = await Job.find({
    userEmail: session.user.email,
    createdAt: { $gte: startDate.toDate() },
  });

  // Group by date
  const grouped: Record<string, number> = {};

  jobs.forEach(job => {
    const key = dayjs(job.createdAt).format("YYYY-MM-DD");
    grouped[key] = (grouped[key] || 0) + 1;
  });

  return NextResponse.json(
    Object.entries(grouped).map(([date, count]) => ({
      date,
      count,
    }))
  );
}
