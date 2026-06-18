import OverviewComponent from "@/components/overview/OverviewComponent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const userId = user?.id;

  if (!user || (user.role !== "trainer" && user.role !== "admin")) {
    return redirect("/login");
  }

  const classData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/classes?userId=${userId}`,
    {
      cache: "no-store",
    },
  );
  const classesCount = (await classData.json()).length;

  const forumPosts = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-post?userId=${userId}`,
    { cache: "no-store" },
  );
  const forumPostCount = (await forumPosts.json()).length;
  return <OverviewComponent classesCount={classesCount} forumPostCount={forumPostCount} user={user} />;
};

export default DashboardPage;
