import ApplyAsTrainerForm from "@/components/dashboard/user/ApplyAsTrainerForm";
import TrainerPendingApplication from "@/components/dashboard/user/TrainerPendingApplication";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ApplyAsTrainerPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-applications/${userId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const [applicationData] = await res.json();

  return (
    <div>
      {applicationData ? (
        <TrainerPendingApplication applicationData={applicationData} />
      ) : (
        <ApplyAsTrainerForm user={user} />
      )}
    </div>
  );
};

export default ApplyAsTrainerPage;
