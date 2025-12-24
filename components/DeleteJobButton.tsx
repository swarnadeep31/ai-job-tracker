"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Are you sure you want to delete this job?");
    if (!ok) return;

    setLoading(true);

    await fetch("/api/jobs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });

    setLoading(false);
    router.refresh(); // 🔥 refresh server data
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
