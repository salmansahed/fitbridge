import TrainerTableClient from "@/components/dashboard/admin/TrainerTableClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { HiOutlineUsers } from "react-icons/hi";

export default async function ManageTrainersPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  let initialTrainers = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/trainers`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success) {
      initialTrainers = data.trainers;
    }
  } catch (error) {
    console.error("Error fetching trainers on server:", error);
  }

  return (
    <div className="p-6 bg-slate-50 dark:bg-[#0a0a0a] min-h-screen">
      <div className="mb-6 shadow-sm rounded-xl p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          Manage Trainers
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Here you can view and manage all the trainers registered on the
          platform.
        </p>
        {/* Total Trainers */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Total Trainers:{" "}
          <span className="font-semibold text-xl text-green-500 sm:text-2xl dark:text-green-400">
            {initialTrainers.length}
          </span>
        </p>
      </div>

      {initialTrainers && initialTrainers.length > 0 ? (
        <TrainerTableClient initialTrainers={initialTrainers} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <HiOutlineUsers className="w-8 h-8 text-slate-400 dark:text-zinc-500" />
          </div>

          <h3 className="text-lg font-semibold text-slate-700 dark:text-white mb-2">
            No Trainers Found
          </h3>
          <p className="text-slate-500 dark:text-zinc-400 max-w-sm">
            Currently, there are no trainers available in the database. Please
            add new trainers to get started.
          </p>
        </div>
      )}
    </div>
  );
}
