import ApplyAsTrainerForm from "@/components/dashboard/user/ApplyAsTrainerForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ApplyAsTrainerPage = async() => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id;
  return (
    <div>
      <ApplyAsTrainerForm userId={userId} />
    </div>
  );
};

export default ApplyAsTrainerPage;
