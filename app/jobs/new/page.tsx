"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    role: "",
    appliedDate: "",
    status: "Applied",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.companyName.trim()) {
      toast.error("Company name is required");
      return false;
    }
    if (!form.role.trim()) {
      toast.error("Role is required");
      return false;
    }
    if (!form.appliedDate) {
      toast.error("Applied date is required");
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Failed to add job");
      return;
    }

    toast.success("Job added 🎉");
    router.push("/jobs");
    router.refresh();
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Job</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
        <Input
          label="Company Name"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder="Google"
        />

        <Input
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Frontend Developer"
        />

        <Input
          label="Applied Date"
          name="appliedDate"
          type="date"
          value={form.appliedDate}
          onChange={handleChange}
          className="
    w-full
    rounded-md
    bg-black
    border border-white/10
    px-3 py-2
    text-white
    cursor-pointer
    focus:outline-none
    focus:border-white/30
  "
        />

        <div>
          <label className="block text-sm text-gray-400 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-md bg-black border border-white/10 px-3 py-2">
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <button
          disabled={loading}
          className="
    w-full rounded-md bg-white px-4 py-2
    text-black font-medium
    hover:bg-gray-200 transition
    disabled:opacity-50
    disabled:cursor-not-allowed
  ">
          {loading ? "Saving..." : "Add Job"}
        </button>
      </form>
    </div>
  );
}

/* ----------------------------- */
/* Reusable Input Component      */
/* ----------------------------- */
function Input({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        {...props}
        required
        className="w-full rounded-md bg-black border border-white/10 px-3 py-2 text-white"
      />
    </div>
  );
}
