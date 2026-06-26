import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const TrainerMyClassesLayout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userRole = session?.user?.role;

  if (!session) {
    return redirect("/login");
  }

  if (userRole !== "trainer") {
    return redirect("/forbidden");
  }

  return <div>{children}</div>;
};

export default TrainerMyClassesLayout;
