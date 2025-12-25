import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";

type Params = {
  params: Promise<{ id: string }>;
};

/* ------------------ PATCH (UPDATE STATUS) ------------------ */
export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params; // ✅ FIX (important)

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = await req.json();

  await connectDB();

  const job = await Job.findOneAndUpdate(
    { _id: id, userEmail: session.user.email },
    { status },
    { new: true }
  );

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
