// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// const STATUS_OPTIONS = ["All", "Applied", "Interview", "Offer", "Rejected"];

// export default function JobFilters() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [q, setQ] = useState(searchParams.get("q") ?? "");
//   const [status, setStatus] = useState(searchParams.get("status") ?? "All");

//   function applyFilters() {
//     const params = new URLSearchParams();

//     if (q.trim()) params.set("q", q.trim());
//     if (status !== "All") params.set("status", status);

//     router.push(`/jobs?${params.toString()}`);
//   }

//   return (
//     <div className="mb-6 flex flex-wrap gap-3">
//       <input
//         type="text"
//         placeholder="Search company or role..."
//         value={q}
//         onChange={(e) => setQ(e.target.value)}
//         className="rounded border px-3 py-2 text-sm"
//       />

//       <select
//         value={status}
//         onChange={(e) => setStatus(e.target.value)}
//         className="rounded border px-3 py-2 text-sm"
//       >
//         {STATUS_OPTIONS.map((s) => (
//           <option key={s} value={s}>
//             {s}
//           </option>
//         ))}
//       </select>

//       {/* 🔴 IMPORTANT FIX HERE */}
//       <button
//         type="button"
//         onClick={applyFilters}
//         className="rounded bg-black px-4 py-2 text-sm text-white"
//       >
//         Apply
//       </button>
//     </div>
//   );
// }

// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { Search, X } from "lucide-react";

// const STATUS_OPTIONS = ["All", "Applied", "Interview", "Offer", "Rejected"];

// export default function JobFilters() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [q, setQ] = useState(searchParams.get("q") ?? "");
//   const [status, setStatus] = useState(searchParams.get("status") ?? "All");

//   function applyFilters() {
//     const params = new URLSearchParams();

//     if (q.trim()) params.set("q", q.trim());
//     if (status !== "All") params.set("status", status);

//     router.push(`/jobs?${params.toString()}`);
//   }

//   function clearSearch() {
//     setQ("");
//     router.push("/jobs");
//   }

//   return (
//     <div className="mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur px-4 py-3 shadow-lg">
//       <div className="flex flex-wrap items-center gap-3">
//         {/* 🔍 Search */}
//         <div className="relative flex-1 min-w-55">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

//           <input
//             type="text"
//             placeholder="Search company or role"
//             value={q}
//             onChange={(e) => setQ(e.target.value)}
//             className="
//               w-full rounded-full bg-black
//               border border-white/10
//               pl-9 pr-9 py-2 text-sm text-white
//               placeholder:text-gray-400
//               focus:outline-none focus:ring-2 focus:ring-white/20
//             "
//           />

//           {q && (
//             <button
//               onClick={clearSearch}
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
//             >
//               <X size={14} />
//             </button>
//           )}
//         </div>

//         {/* ⬇ Status */}
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="
//             rounded-full bg-black
//             border border-white/10
//             px-4 py-2 text-sm text-white
//             focus:outline-none focus:ring-2 focus:ring-white/20
//           "
//         >
//           {STATUS_OPTIONS.map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>

//         {/* 🚀 Apply */}
//         <button
//           type="button"
//           onClick={applyFilters}
//           className="
//             rounded-full bg-white
//             px-5 py-2 text-sm font-medium text-black
//             hover:bg-gray-200 transition
//           "
//         >
//           Go
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";

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
    <div className="flex justify-center items-center gap-3 rounded-4xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      {/* 🔍 Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search jobs..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="
            h-10 w-48 rounded-full
            bg-black/40
            border border-white/10
            pl-9 pr-4
            text-sm text-white
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-white/20
          "
        />
      </div>

      {/* 🔽 Status Dropdown */}
      <FilterSelect
        value={status}
        onChange={setStatus}
        options={STATUS_OPTIONS}
        label="Status"
      />

      {/* ✅ Apply */}
      <button
        onClick={applyFilters}
        className="
          h-10 rounded-full
          bg-white px-6
          text-sm font-medium text-black
          hover:bg-gray-200
          transition
        ">
        Apply
      </button>
      <Link
        href="/jobs/new"
        className="rounded-3xl bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-200 transition">
        + Add Job
      </Link>
    </div>
  );
}

/* ----------------------------- */
/* Reusable Pill Select          */
/* ----------------------------- */
function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-10 appearance-none rounded-full
          bg-black/40
          border border-white/10
          px-4 pr-9
          text-sm text-white
          focus:outline-none focus:ring-2 focus:ring-white/20
        ">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
