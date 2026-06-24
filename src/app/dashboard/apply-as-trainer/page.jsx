import ApplyAsTrainerForm from "@/components/dashboard/user/ApplyAsTrainerForm";
import TrainerPendingApplication from "@/components/dashboard/user/TrainerPendingApplication";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ApplyAsTrainerPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-applications/${userId}`,
  );
  const [applicationData] = await res.json();

  return (
    <div>
      {applicationData ? (
        <TrainerPendingApplication applicationData={applicationData} />
      ) : (
        <ApplyAsTrainerForm userId={userId} />
      )}
    </div>
  );
};

export default ApplyAsTrainerPage;
