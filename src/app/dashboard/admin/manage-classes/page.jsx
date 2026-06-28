export const metadata = {
  title: "Manage Classes",
};

import ClassTableClient from "@/components/dashboard/admin/ClassTableClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { MdOutlineClass } from "react-icons/md";

export default async function ManageClassesPage() {
  let initialClasses = [];

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/classes-for-admin`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (Array.isArray(data)) {
      initialClasses = data;
    } else if (data && data.success) {
      initialClasses = data.classes || [];
    }
  } catch (error) {
    console.error("Error fetching classes on server:", error);
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 shadow-sm rounded-xl p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          Manage Classes
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Here you can view and manage all the classes submitted by instructors.
        </p>
        {/* Total Classes */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Total Classes:{" "}
          <span className="font-semibold text-xl text-green-500 sm:text-2xl dark:text-green-400">
            {initialClasses.length}
          </span>
        </p>
      </div>

      {initialClasses.length > 0 ? (
        <ClassTableClient initialClasses={initialClasses} />
      ) : (
        // No classes found message
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
          <div className="w-16 h-16 mb-4 text-slate-300 flex items-center justify-center">
            <MdOutlineClass className="w-12 h-12" />
          </div>

          <h3 className="text-lg font-semibold text-slate-700">
            No Classes Found
          </h3>
          <p className="text-slate-500 mt-1 max-w-sm">
            Currently, there are no classes available to manage. New classes
            will appear here once submitted.
          </p>
        </div>
      )}
    </div>
  );
}
