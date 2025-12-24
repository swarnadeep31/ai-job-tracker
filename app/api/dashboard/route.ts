import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { connect } from "http2";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(authOptions)

    if(!session?.user?.email){
        return NextResponse.json({error:"Unauthorized"},{status : 401})
    }

    await connectDB()

    const jobs = await Job.find({userEmail: session.user.email})

    const stats = {
        total : jobs.length,
        applied: jobs.filter(j => j.status === "Applied").length,
        interview: jobs.filter(j => j.status === "Interview").length,
        offer: jobs.filter(j => j.status === "Offer").length,
        rejection: jobs.filter(j => j.status === "Rejection").length,
    }

    return NextResponse.json(stats)
}