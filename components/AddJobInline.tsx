"use client";

import { useState } from "react";

export default function AddJobInline() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    appliedDate: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("✅ Job added successfully");
      setForm({ companyName: "", role: "", appliedDate: "" });
    } else {
      setMessage("❌ Failed to add job");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 mx-auto max-w-xl rounded-xl border border-white/10 bg-white/5 p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-white">
        Add a Job Application
      </h3>

      <input
        required
        placeholder="Company name"
        value={form.companyName}
        onChange={(e) =>
          setForm({ ...form, companyName: e.target.value })
        }
        className="w-full rounded-md bg-black border border-white/10 px-4 py-2 text-white outline-none focus:border-white/30"
      />

      <input
        required
        placeholder="Role"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="w-full rounded-md bg-black border border-white/10 px-4 py-2 text-white outline-none focus:border-white/30"
      />

      <input
        required
        type="date"
        value={form.appliedDate}
        onChange={(e) =>
          setForm({ ...form, appliedDate: e.target.value })
        }
        className="w-full rounded-md bg-black border border-white/10 px-4 py-2 text-white outline-none focus:border-white/30"
      />

      <button
        disabled={loading}
        className="w-full rounded-md bg-white py-2 font-medium text-black hover:bg-gray-200 transition disabled:opacity-60"
      >
        {loading ? "Saving..." : "Add Job"}
      </button>

      {message && (
        <p className="text-sm text-center text-gray-300">{message}</p>
      )}
    </form>
  );
}
