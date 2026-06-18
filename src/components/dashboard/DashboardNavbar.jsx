import { Button } from "@heroui/react";
import { FaAnglesLeft } from "react-icons/fa6";
import ThemeSwitch from "../ThemeSwitch";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const DashboardNavbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <div className="bg-white dark:bg-neutral-950 flex items-center justify-between p-4 mb-6 border-b border-gray-300 dark:border-neutral-800 transition-colors duration-300">
      <div>
        <h1 className="capitalize text-lg sm:text-2xl font-bold text-blue-600 dark:text-white hidden md:block">
          <span className="text-green-600 dark:text-green-500">
            {user?.role}
          </span>{" "}
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-neutral-400 hidden md:block">
          Welcome back, {user?.name}!
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden sm:block">
          <ThemeSwitch />
        </div>
        <div>
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-md hover:rounded-3xl transition-all duration-300 border-gray-300 dark:border-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-900 text-sm hidden md:inline-flex"
            >
              <FaAnglesLeft />
              Back to Site
            </Button>
          </Link>
          <div className="flex items-center md:hidden">
            <h1 className="capitalize pr-3 border-r dark:border-gray-500">
              {user?.role} <span>Dashboard</span>
            </h1>
            <Link href="/" className="flex items-center gap-1 text-sm ml-3">
              <FaAnglesLeft />
              Back to Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
