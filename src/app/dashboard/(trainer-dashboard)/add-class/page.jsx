import AddClassForm from "@/components/trainer_dashboard/AddClassForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AddClassPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user || user.role !== "trainer" && user.role !== "admin") {
    return redirect("/forbidden");
  }
  return (
    <div>
      <AddClassForm user={user} />
    </div>
  );
};

export default AddClassPage;
