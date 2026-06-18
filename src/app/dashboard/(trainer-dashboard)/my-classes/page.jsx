import ClassCard from "@/components/classes/ClassCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { HiOutlineFolderOpen, HiPlus } from "react-icons/hi";
import { Button } from "@heroui/react";

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
  const hasClasses = classes && classes.length > 0;

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
          My Classes
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          Here are the classes you&apos;ve created. You can view, edit, or
          delete your classes from this dashboard.
        </p>
      </div>

      {hasClasses ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {classes.map((classItem) => (
            <ClassCard key={classItem._id} classData={classItem} userId={userId} />
          ))}
        </div>
      ) : (
        <div className="w-full min-h-100 flex flex-col items-center justify-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-950 p-8 shadow-2xs text-center transition-all">
          <div className="w-16 h-16 bg-[#f4f9ed] dark:bg-[#1a2412] text-[#72c113] rounded-full flex items-center justify-center mb-4 border border-[#d2ebaf] dark:border-[#38531a]">
            <HiOutlineFolderOpen className="text-3xl" />
          </div>

          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-1">
            No Classes Found
          </h3>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mb-5 leading-relaxed">
            You haven&apos;t created any fitness classes yet. Start creating
            your first class to engage with trainees.
          </p>

          <Link href="/dashboard/add-class">
            <Button className="gap-1.5 px-4 py-2 bg-[#72c113] hover:bg-[#61a410] text-white text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer shadow-sm active:scale-95">
              <HiPlus className="text-sm" />
              Add Your First Class
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyClassesPage;
