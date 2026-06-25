import TrainerTableClient from "@/components/dashboard/admin/TrainerTableClient";
import React from "react";

export default async function ManageTrainersPage() {
  let initialTrainers = [];

  try {
    // Fetch data directly on the server side without useEffect
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/trainers`, {
      cache: "no-store",
    });

    const data = await res.json();
    if (data.success) {
      initialTrainers = data.trainers;
    }
  } catch (error) {
    console.error("Error fetching trainers on server:", error);
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Manage Trainers
        </h2>
      </div>

      {/* Passing data fetched from the server as props to the client component */}
      <TrainerTableClient initialTrainers={initialTrainers} />
    </div>
  );
}
