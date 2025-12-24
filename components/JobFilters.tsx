"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const STATUS_OPTIONS = ["All", "Applied", "Interview", "Offer", "Rejected"];

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "All");

  function applyFilters() {
    const params = new URLSearchParams();

    if (q.trim()) params.set("q", q.trim());
    if (status !== "All") params.set("status", status);

    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <input
        type="text"
        placeholder="Search company or role..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="rounded border px-3 py-2 text-sm"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded border px-3 py-2 text-sm"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* 🔴 IMPORTANT FIX HERE */}
      <button
        type="button"
        onClick={applyFilters}
        className="rounded bg-black px-4 py-2 text-sm text-white"
      >
        Apply
      </button>
    </div>
  );
}
