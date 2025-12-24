"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          JobTrackr
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          {/* Show ONLY when logged in */}
          {session && (
            <>
              <Link
                href="/jobs"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Jobs
              </Link>

              <Link
                href="/dashboard"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>
            </>
          )}

          {/* Auth Button */}
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
