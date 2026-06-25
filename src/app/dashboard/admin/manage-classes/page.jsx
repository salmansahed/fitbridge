import ClassTableClient from "@/components/dashboard/admin/ClassTableClient";
import React from "react";
import { MdOutlineClass } from "react-icons/md";

export default async function ManageClassesPage() {
  let initialClasses = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/classes-for-admin`,
      {
        cache: "no-store",
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          Manage Classes
        </h2>
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
