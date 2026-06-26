import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AdminManageClassesLayout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userRole = session?.user?.role;

  if (!session) {
    return redirect("/login");
  }

  if (userRole !== "admin") {
    return redirect("/forbidden");
  }

  return <div>{children}</div>;
};

export default AdminManageClassesLayout;
