// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import Link from "next/link";
// import MotionWrapper from "@/components/MontionWrapper";

// export default async function HomePage() {
//   const session = await getServerSession(authOptions);

//   return (
//     <MotionWrapper>
//       <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
//         <div className="max-w-3xl text-center space-y-8">
//           <h1 className="text-4xl md:text-5xl font-bold">
//             Track your job applications
//             <br />
//             <span className="text-gray-400">in one simple place</span>
//           </h1>

//           <p className="text-gray-400 text-lg">
//             Manage applications, track statuses, and stay organized.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {session ? (
//               <>
//                 <Link
//                   href="/jobs/new"
//                   className="rounded-md bg-white px-6 py-3 text-black font-medium hover:bg-gray-200 transition">
//                   + Add New Job
//                 </Link>

//                 <Link
//                   href="/dashboard"
//                   className="rounded-md border border-white/20 px-6 py-3 hover:bg-white/10 transition">
//                   Dashboard
//                 </Link>
//               </>
//             ) : (
//               <Link
//                 href="#"
//                 className="rounded-md bg-white px-6 py-3 text-black font-medium">
//                 Login to Get Started
//               </Link>
//             )}
//           </div>
//         </div>
//       </main>
//     </MotionWrapper>
//   );
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import MotionWrapper from "@/components/MontionWrapper";
import Image from "next/image";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <MotionWrapper>
      <main className="px-6 py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              Track your job applications
              <br />
              <span className="text-gray-400">in one simple place</span>
            </h1>

            <p className="max-w-xl text-gray-400 text-lg">
              Manage applications, track statuses, and stay organized with a
              clean dashboard designed for focused job hunting.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {session ? (
                <>
                  <Link
                    href="/jobs/new"
                    className="rounded-lg bg-white px-6 py-3 text-black font-medium hover:bg-gray-200 transition">
                    + Add New Job
                  </Link>

                  <Link
                    href="/dashboard"
                    className="rounded-lg border border-white/20 px-6 py-3 hover:bg-white/10 transition">
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="rounded-lg bg-white px-6 py-3 text-black font-medium hover:bg-gray-200 transition">
                  Login to Get Started
                </Link>
              )}
            </div>
          </div>

          {/* ================= RIGHT IMAGE PLACEHOLDER ================= */}
          <div className="relative w-full">
            {/* 🔹 IMAGE CONTAINER */}
            <div
              className="
                aspect-16/10
                w-full
                rounded-2xl
                bg-white/5
                border border-white/10
                flex items-center justify-center
                text-gray-500
              ">
              {/* Replace this div with <Image /> later */}

              <Image
                src="/hero-image.jpg"
                alt="Job tracking dashboard"
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            {/* 🔹 Optional floating stat cards (can remove later) */}
            <div className="absolute -bottom-6 left-6 flex gap-4">
              <div className="rounded-xl bg-black/80 backdrop-blur border border-white/10 px-5 py-3">
                <p className="text-2xl font-bold">34</p>
                <p className="text-xs text-gray-400">Total Jobs</p>
              </div>

              <div className="rounded-xl bg-black/80 backdrop-blur border border-white/10 px-5 py-3">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-gray-400">Interviews</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MotionWrapper>
  );
}
