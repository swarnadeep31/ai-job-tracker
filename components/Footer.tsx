"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="mt-20 border-t border-white/10 bg-black/80 backdrop-blur"
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white">JobTrackr</h2>
            <p className="mt-2 text-sm text-gray-400">
              Track your job applications in one place.
            </p>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition">
              Home
            </Link>
            <Link href="/jobs" className="text-gray-400 hover:text-white transition">
              Jobs
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-white transition"
            >
              Dashboard
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right text-sm text-gray-500">
            © {new Date().getFullYear()} JobTrackr.  
            <br />
            Built with ❤️ using Next.js
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
