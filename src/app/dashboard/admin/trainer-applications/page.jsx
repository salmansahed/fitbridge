import React from "react";
import TrainerCard from "./TrainerCard";

const TrainerApplicationsPage = async () => {
  const applicationsRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-applications`,
    { cache: "no-store" },
  );
  const { applications } = await applicationsRes.json();
  console.log("applications", applications);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold text-slate-800 max-w-4xl mx-auto mb-2">
        Trainer Applications ({applications?.length || 0})
      </h2>
      {applications && applications.length > 0 ? (
        applications.map((application) => (
          <TrainerCard key={application._id} application={application} />
        ))
      ) : (
        <div className="text-center text-slate-400 my-10 max-w-4xl mx-auto py-10 border border-dashed rounded-2xl">
          No pending trainer applications found.
        </div>
      )}
    </div>
  );
};

export default TrainerApplicationsPage;
