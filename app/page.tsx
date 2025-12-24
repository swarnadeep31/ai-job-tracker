import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold">
          Track your job applications
          <br />
          <span className="text-gray-400">in one simple place</span>
        </h1>

        <p className="text-gray-400 text-lg">
          Manage applications, track statuses, and stay organized.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {session ? (
            <>
              <Link
                href="/jobs/new"
                className="rounded-md bg-white px-6 py-3 text-black font-medium hover:bg-gray-200 transition"
              >
                + Add New Job
              </Link>

              <Link
                href="/dashboard"
                className="rounded-md border border-white/20 px-6 py-3 hover:bg-white/10 transition"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              href="#"
              className="rounded-md bg-white px-6 py-3 text-black font-medium"
            >
              Login to Get Started
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
