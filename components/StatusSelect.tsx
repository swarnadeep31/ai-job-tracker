"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export default function StatusSelect({
  jobId,
  initialStatus,
}: {
  jobId: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function updateStatus() {
    setLoading(true);

    const res = await fetch(`/api/jobs/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Failed to update status");
      return;
    }

    toast.success("Status updated");
    router.refresh(); // 🔥 refresh server data
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-md bg-black border border-white/10 px-2 py-1 text-sm text-white"
      >
        {STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <button
        onClick={updateStatus}
        disabled={loading || status === initialStatus}
        className="
          rounded-md bg-blue-600 px-3 py-1 text-sm text-white
          hover:bg-blue-700 transition
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
}
