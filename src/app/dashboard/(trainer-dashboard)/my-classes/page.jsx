import ClassCard from "@/components/classes/ClassCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyClassesPage = async () => {
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
  const classes = await classData.json();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {classes.map((classItem) => (
          <ClassCard key={classItem._id} classData={classItem} />
        ))}
      </div>
    </div>
  );
};

export default MyClassesPage;
