import DeleteJobButton from "@/components/DeleteJobButton";
import JobFilters from "@/components/JobFilters";
import StatusBadge from "@/components/StatusBadge";
import StatusSelect from "@/components/StatusSelect";
import { headers } from "next/headers";

type SearchParams = {
  q?: string;
  status?: string;
};

/* ----------------------------- */
/* Fetch Jobs (Server Side)      */
/* ----------------------------- */
async function getJobs(searchParams: SearchParams) {
  const headersList = await headers();
  const cookie = headersList.get("cookie") ?? "";

  const params = new URLSearchParams();

  if (typeof searchParams.q === "string" && searchParams.q.length > 0) {
    params.set("q", searchParams.q);
  }

  if (
    typeof searchParams.status === "string" &&
    searchParams.status !== "All"
  ) {
    params.set("status", searchParams.status);
  }

  const res = await fetch(
    `http://localhost:3000/api/jobs?${params.toString()}`,
    {
      headers: {
        Cookie: cookie, // 🔑 forward auth session
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}

/* ----------------------------- */
/* Jobs Page                     */
/* ----------------------------- */
export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const jobs = await getJobs(resolvedSearchParams);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">My Jobs</h1>
      </div>

      {/* Filters */}
      <JobFilters />

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="mt-10 text-center text-gray-400">
          No jobs found. Try adjusting filters or add a new job.
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-gray-300">
              <tr>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Applied Date</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job: any) => (
                <tr
                  key={job._id}
                  className="border-t hover:bg-white/5 transition">
                  <td className="p-4 font-medium text-white">
                    {job.companyName}
                  </td>

                  <td className="p-4 text-gray-300">{job.role}</td>

                  <td className="p-3">
                    <div className="flex flex-col gap-2">
                      <StatusBadge status={job.status} />
                      <StatusSelect
                        jobId={job._id}
                        initialStatus={job.status}
                      />
                    </div>
                  </td>

                  <td className="p-4 text-gray-400">
                    {new Date(job.appliedDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <DeleteJobButton jobId={job._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
