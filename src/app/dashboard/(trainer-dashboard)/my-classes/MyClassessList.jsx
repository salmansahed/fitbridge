import DeleteClassModal from "@/components/classes/DeleteClassModal";
import EditClassCardModal from "@/components/classes/EditClassCardModal";
import EnrollStudentModal from "@/components/classes/EnrollStudentModal";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineEye } from "react-icons/hi";

const MyClassessList = async ({ classItem, userId }) => {
  const totalBookingsCountRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/subscriptions/count/${classItem._id}`,
    { cache: "no-store" },
  );
  const { bookingCount } = await totalBookingsCountRes.json();
  const totalBookings = bookingCount || 0;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const enrolledRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/subscriptions/enrolled-users/${classItem._id}?userId=${userId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const enrolledUsers = await enrolledRes.json();

  return (
    <div
      key={classItem._id}
      className="group flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl hover:border-green-500 transition-all duration-300 shadow-sm flex-wrap gap-4"
    >
      {/* Image and Title */}
      <div className="flex items-center gap-4">
        <Image
          src={classItem.image}
          alt={classItem.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg">
              {classItem.name.length > 20
                ? `${classItem.name.slice(0, 20)}...`
                : classItem.name}
            </h3>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              {classItem.status}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span className="capitalize">{classItem.category}</span>
            <span>•</span>
            <span>{classItem.duration} min</span>
            <span>•</span>
            <span>{totalBookings} bookings</span>
            <span>•</span>
            <span className="font-bold text-yellow-500">
              ${classItem.price}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Buttons */}
      <div className="flex items-center gap-2">
        <EnrollStudentModal enrolledUsers={enrolledUsers} />
        <Link href={`/class-details/${classItem._id}`}>
          <Button className="bg-gray-100 text-black border border-neutral-300 dark:bg-neutral-700 dark:text-white dark:border-neutral-600 hover:bg-gray-200 dark:hover:bg-neutral-600">
            <HiOutlineEye size={18} />
            View Class
          </Button>
        </Link>
        <EditClassCardModal classData={classItem} />
        <DeleteClassModal classData={classItem} />
      </div>
    </div>
  );
};

export default MyClassessList;
