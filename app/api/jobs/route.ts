import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: " Uauthorized" }, { status: 401 });
  }

  const body = await req.json();

  await connectDB();

  const job = await Job.create({
    ...body,
    userEmail: session.user.email,
  });

  return NextResponse.json(job, { status: 201 });
}

// export async function GET(req: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { searchParams } = new URL(req.url);

//   const q = searchParams.get("q");        // search text
//   const status = searchParams.get("status"); // filter

//   await connectDB();

//   const query: any = {
//     userEmail: session.user.email,
//   };

//   // 🔍 Search by company OR role
//   if (q) {
//     query.$or = [
//       { companyName: { $regex: q, $options: "i" } },
//       { role: { $regex: q, $options: "i" } },
//     ];
//   }

//   // 🎯 Status filter
//   if (status && status !== "All") {
//     query.status = status;
//   }

//   const jobs = await Job.find(query).sort({ createdAt: -1 });

//   return NextResponse.json(jobs);
// }

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q");
    const status = searchParams.get("status");

    await connectDB();

    const query: any = {
      userEmail: session.user.email,
    };

    // 🔍 Search
    if (q) {
      query.$or = [
        { companyName: { $regex: q, $options: "i" } },
        { role: { $regex: q, $options: "i" } },
      ];
    }

    // 🎯 Status filter
    if (status && status !== "All") {
      query.status = status;
    }

    // ✅ THIS WAS MISSING
    const jobs = await Job.find(query).sort({ createdAt: -1 });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("GET /api/jobs failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId, status } = await req.json();

  if (!jobId || !status) {
    return NextResponse.json(
      { error: "jobId and status are required" },
      { status: 400 }
    );
  }

  await connectDB();

  const updatedJob = await Job.findOneAndUpdate(
    { _id: jobId, userEmail: session.user.email },
    { status },
    { new: true }
  );

  if (!updatedJob) {
    return NextResponse.json(
      { error: "Job not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedJob);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId } = await req.json();

  if (!jobId) {
    return NextResponse.json({ error: "jobId required" }, { status: 400 });
  }

  await connectDB();

  const deleted = await Job.findOneAndDelete({
    _id: jobId,
    userEmail: session.user.email,
  });

  if (!deleted) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
