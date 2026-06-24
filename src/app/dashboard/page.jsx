import OverviewComponent from "@/components/overview/OverviewComponent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const userId = user?.id;

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
  const response = await forumPosts.json();
  const forumPostCount = response.totalPosts;
  console.log("forumPostCount??", forumPostCount);

  const applicationRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-applications/${userId}`,
  );
  const [applicationData] = await applicationRes.json();

  const totalEnrolledStudentsCountRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/subscriptions/total-enrolled/${userId}`,
    { cache: "no-store" },
  );
  const { totalStudents } = await totalEnrolledStudentsCountRes.json();

  const totalBookingRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/subscriptions/my-bookings-count/${userId}`,
    { cache: "no-store" },
  );
  const { totalBookings } = await totalBookingRes.json();

  const totalFavoriteClassesCountRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/count/${userId}`,
    { cache: "no-store" },
  );
  const {totalFavorites} = await totalFavoriteClassesCountRes.json();

  return (
    <OverviewComponent
      applicationData={applicationData}
      classesCount={classesCount}
      forumPostCount={forumPostCount}
      user={user}
      totalEnrolledStudents={totalStudents}
      totalBookings={totalBookings}
      totalFavorites={totalFavorites}
    />
  );
};

export default DashboardPage;
