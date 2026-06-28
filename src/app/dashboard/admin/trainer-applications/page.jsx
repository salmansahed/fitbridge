import TrainerCard from "@/components/dashboard/admin/TrainerCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { LuInbox } from "react-icons/lu";

const TrainerApplicationsPage = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const applicationsRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-applications`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const { applications } = await applicationsRes.json();

  return (
    <div className="container mx-auto px-4 py-6">
      <div
        className={`mb-6 shadow-sm rounded-xl p-6 ${applications && applications.length > 0 ? "max-w-4xl mx-auto" : ""} bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700`}
      >
        <h2
          className={`text-xl font-bold text-slate-800 dark:text-white ${applications && applications.length > 0 ? "max-w-4xl mx-auto" : ""}`}
        >
          Trainer Applications ({applications?.length || 0})
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review and manage trainer applications submitted by potential
          trainers.
        </p>
      </div>
      {applications && applications.length > 0 ? (
        applications.map((application) => (
          <TrainerCard key={application._id} application={application} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center my-10 py-16 px-6 bg-white dark:bg-zinc-900 border border-dashed border-slate-300 dark:border-zinc-700 rounded-2xl shadow-sm text-center">
          <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-5 border border-slate-100 dark:border-zinc-700">
            <LuInbox className="w-8 h-8 text-slate-400 dark:text-zinc-500" />
          </div>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
            No Pending Applications
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
            There are currently no new trainer applications to review. Great job
            keeping up with the queue!
          </p>
        </div>
      )}
    </div>
  );
};

export default TrainerApplicationsPage;
