export const metadata = {
  title: "My Favorite Classes",
};

import ClassCard from "@/components/classes/ClassCard";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";
import { RiHeartLine } from "react-icons/ri";

const UserFavoritesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/${userId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  const favorites = data.favoriteClasses || [];

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 md:p-16 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/50 rounded-3xl text-center max-w-md mx-auto shadow-xs group transition-all duration-300 hover:border-red-500/30">
        <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 mb-5 relative overflow-hidden group-hover:scale-110 group-hover:text-red-500 dark:group-hover:text-red-400 transition-all duration-300">
          <RiHeartLine className="text-4xl relative z-10" />
          <div className="absolute inset-0 bg-linear-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <h3 className="text-lg font-black text-neutral-800 dark:text-white mb-2 tracking-tight">
          No Favorite Classes
        </h3>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed max-w-xs mb-6">
          You haven&apos;t added any classes to your favorites yet. Explore and
          heart your favorite sessions!
        </p>
        <Link href="/all-classes" className="w-full">
          <Button className="w-full font-bold text-xs text-white bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-md hover:rounded-3xl py-5 transition-all duration-300 shadow-lg shadow-red-600/10">
            Explore All Classes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
          My Favorite Classes
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
          Keep track of the fitness classes you love and revisit them anytime.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {favorites.map((favorite) => (
          <ClassCard
            key={favorite.id}
            classData={favorite?.classDetails}
            userId={userId}
            favoriteStatus={data?.success}
          />
        ))}
      </div>
    </div>
  );
};

export default UserFavoritesPage;
