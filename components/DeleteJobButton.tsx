"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);

    const res = await fetch(`/api/jobs/${jobId}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Failed to delete job");
      return;
    }

    toast.success("Job deleted");
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      {/* Delete trigger */}
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-red-400 hover:text-red-300 transition"
      >
        Delete
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal Card */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="w-full max-w-sm rounded-xl bg-black border border-white/10 p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Delete this job?
                </h3>

                <p className="text-sm text-gray-400 mb-6">
                  This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
