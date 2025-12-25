"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `text-sm transition ${
      pathname === path
        ? "text-white font-medium"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 h-16 grid grid-cols-3 items-center">
        {/* LEFT: Brand */}
        <div className="flex justify-start">
          <Link href="/" className="text-xl font-bold text-white">
            JobTrackr
          </Link>
        </div>

        {/* CENTER: Navigation */}
        <div className="flex justify-center gap-8">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          {session && (
            <>
              <Link href="/jobs" className={linkClass("/jobs")}>
                Jobs
              </Link>

              <Link href="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>
            </>
          )}
        </div>

        {/* RIGHT: Auth */}
        <div className="flex justify-end">
          {status === "loading" ? null : session ? (
            <button
              onClick={() => signOut()}
              className="text-sm text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
