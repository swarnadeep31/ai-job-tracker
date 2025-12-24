"use client";

import { useState } from "react";

export default function StatusSelect({
  jobId,
  initialStatus,
}: {
  jobId: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  async function updateStatus() {
    setLoading(true);

    await fetch(`/api/jobs/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="
          rounded-md
          border border-white/20
          bg-black px-3 py-1.5
          text-sm text-white
          focus:outline-none focus:ring-1 focus:ring-blue-500
        "
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <button
        onClick={updateStatus}
        disabled={loading}
        className="
          rounded-md
          bg-blue-600 px-3 py-1.5
          text-sm font-medium text-white
          hover:bg-blue-500
          disabled:opacity-50
          transition
        "
      >
        {loading ? "..." : "Update"}
      </button>
    </div>
  );
}
