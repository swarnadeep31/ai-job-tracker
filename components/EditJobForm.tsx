"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"];

export default function EditJobForm({ job }: { job: any }) {
  const router = useRouter();

  const [companyName, setCompanyName] = useState(job.companyName);
  const [role, setRole] = useState(job.role);
  const [appliedDate, setAppliedDate] = useState(
    job.appliedDate.slice(0, 10)
  );
  const [status, setStatus] = useState(job.status);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch(`/api/jobs/${job._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName,
        role,
        appliedDate,
        status,
      }),
    });

    setLoading(false);
    router.push("/jobs");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="w-full rounded border p-2"
        placeholder="Company name"
        required
      />

      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full rounded border p-2"
        placeholder="Role"
        required
      />

      <input
        type="date"
        value={appliedDate}
        onChange={(e) => setAppliedDate(e.target.value)}
        className="w-full rounded border p-2"
        required
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full rounded border p-2"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Update Job"}
      </button>
    </form>
  );
}
