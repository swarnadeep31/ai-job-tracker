"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="
          mx-auto
          max-w-6xl
          rounded-full
          border border-white/10
          bg-black/70
          backdrop-blur-xl
          px-6
          py-3
          shadow-lg
        "
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold text-white tracking-tight"
          >
            JobTrackr
          </Link>

          {/* Center Nav */}
          {session && (
            <div className="hidden md:flex items-center gap-8">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/jobs">Jobs</NavItem>
              <NavItem href="/dashboard">Dashboard</NavItem>
            </div>
          )}

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            {session ? (
              <button
                onClick={() => signOut()}
                className="
                  rounded-full
                  bg-white/10
                  px-4 py-2
                  text-sm
                  text-white
                  hover:bg-white/20
                  transition
                "
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="
                  rounded-full
                  bg-white
                  px-5 py-2
                  text-sm font-medium
                  text-black
                  hover:bg-gray-200
                  transition
                "
              >
                Start Today →
              </button>
            )}
          </div>
        </div>
      </motion.nav>
    </header>
  );
}

/* ----------------------------- */
/* Nav Item Component            */
/* ----------------------------- */
function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        relative
        text-sm
        text-gray-300
        hover:text-white
        transition
        after:absolute
        after:-bottom-1
        after:left-0
        after:h-0.5
        after:w-0
        after:bg-white
        hover:after:w-full
        after:transition-all
      "
    >
      {children}
    </Link>
  );
}
