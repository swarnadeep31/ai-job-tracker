// import DeleteJobButton from "@/components/DeleteJobButton";
// import Footer from "@/components/Footer";
// import JobFilters from "@/components/JobFilters";

// import MotionWrapper from "@/components/MontionWrapper";
// import MotionTableRow from "@/components/MotionTableRow";
// import Section from "@/components/Section";
// import StatusBadge from "@/components/StatusBadge";
// import StatusSelect from "@/components/StatusSelect";

// import { headers } from "next/headers";
// import Link from "next/link";

// type SearchParams = {
//   q?: string;
//   status?: string;
// };

// async function getJobs(searchParams: SearchParams) {
//   const headersList = await headers();
//   const cookie = headersList.get("cookie") ?? "";

//   const params = new URLSearchParams();
//   if (searchParams.q) params.set("q", searchParams.q);
//   if (searchParams.status && searchParams.status !== "All") {
//     params.set("status", searchParams.status);
//   }

//   const res = await fetch(
//     `http://localhost:3000/api/jobs?${params.toString()}`,
//     {
//       headers: { Cookie: cookie },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) throw new Error("Failed to fetch jobs");
//   return res.json();
// }

// export default async function JobsPage({
//   searchParams,
// }: {
//   searchParams: Promise<SearchParams>;
// }) {
//   const resolvedSearchParams = await searchParams;
//   const jobs = await getJobs(resolvedSearchParams);

//   return (
//     <MotionWrapper>
//       <Section>
//         <div className="p-6 space-y-6">

//           {/* 🔹 Header */}
//           <div className="flex items-center justify-between">
//             <h1 className="text-3xl font-bold text-white">My Jobs</h1>

//             <Link
//               href="/jobs/new"
//               className="
//                 rounded-md
//                 bg-white
//                 px-5 py-2.5
//                 text-sm font-medium text-black
//                 hover:bg-gray-200
//                 transition
//               "
//             >
//               + Add Job
//             </Link>
//           </div>

//           {/* 🔹 Filters */}
//           <JobFilters />

//           {/* 🔹 Empty State */}
//           {jobs.length === 0 ? (
//             <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-10 text-center text-gray-400">
//               No jobs found. Try adjusting filters or add a new job.
//             </div>
//           ) : (
//             /* 🔹 Table Card */
//             <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur">
//               <table className="min-w-full text-sm">
//                 <thead className="bg-white/10 text-gray-300">
//                   <tr>
//                     <th className="p-4 text-left">Company</th>
//                     <th className="p-4 text-left">Role</th>
//                     <th className="p-4 text-left">Status</th>
//                     <th className="p-4 text-left">Applied Date</th>
//                     <th className="p-4 text-left">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {jobs.map((job: any) => (
//                     <MotionTableRow key={job._id}>
//                       <td className="p-4 font-medium text-white">
//                         {job.companyName}
//                       </td>

//                       <td className="p-4 text-gray-300">{job.role}</td>

//                       <td className="p-4">
//                         <div className="flex flex-col gap-2">
//                           <StatusBadge status={job.status} />
//                           <StatusSelect
//                             jobId={job._id}
//                             initialStatus={job.status}
//                           />
//                         </div>
//                       </td>

//                       <td className="p-4 text-gray-400">
//                         {new Date(job.appliedDate).toLocaleDateString()}
//                       </td>

//                       <td className="p-4">
//                         <DeleteJobButton jobId={job._id} />
//                       </td>
//                     </MotionTableRow>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//       </Section>
//     </MotionWrapper>
//   );
// }

import DeleteJobButton from "@/components/DeleteJobButton";
import JobFilters from "@/components/JobFilters";
import MotionWrapper from "@/components/MontionWrapper";
import Section from "@/components/Section";
import StatusBadge from "@/components/StatusBadge";
import StatusSelect from "@/components/StatusSelect";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { headers } from "next/headers";
import Link from "next/link";

type SearchParams = {
  q?: string;
  status?: string;
};

async function getJobs(searchParams: SearchParams) {
  const headersList = await headers();
  const cookie = headersList.get("cookie") ?? "";

  const params = new URLSearchParams();
  if (searchParams.q) params.set("q", searchParams.q);
  if (searchParams.status && searchParams.status !== "All") {
    params.set("status", searchParams.status);
  }

  const res = await fetch(
    `${getBaseUrl()}/api/jobs?${params.toString()}`,
    {
      headers: { Cookie: cookie },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const jobs = await getJobs(resolvedSearchParams);

  return (
    <MotionWrapper>
      <Section>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">
              My Jobs Applications
            </h1>
          </div>

          {/* Filters */}
          <div className="flex justify-center">
            <div className=" max-w-5xl">
              <JobFilters />
            </div>
          </div>

          {/* Empty State */}
          {jobs.length === 0 ? (
            <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-10 text-center text-gray-400">
              No jobs found. Try adjusting filters or add a new job.
            </div>
          ) : (
            /* Card Grid */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs.map((job: any) => (
                <div
                  key={job._id}
                  className="
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    p-5
                    hover:bg-white/10
                    transition
                  ">
                  {/* Company */}
                  <div className="mb-2 text-xs uppercase tracking-wide text-gray-400">
                    Company
                  </div>
                  <div className="text-lg font-semibold text-white mb-3">
                    {job.companyName}
                  </div>

                  {/* Role */}
                  <div className="mb-4 text-sm text-gray-300">{job.role}</div>

                  {/* Status */}
                  <div className="mb-4 space-y-2">
                    <StatusBadge status={job.status} />
                    <StatusSelect jobId={job._id} initialStatus={job.status} />
                  </div>

                  {/* Date */}
                  <div className="text-xs text-gray-400 mb-4">
                    Applied on {new Date(job.appliedDate).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <DeleteJobButton jobId={job._id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </MotionWrapper>
  );
}
