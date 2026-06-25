"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Drawer } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAlignLeft } from "react-icons/fa6";

import {
  RxDashboard,
  RxCalendar,
  RxHeart,
  RxFileText,
  RxPlus,
  RxLayers,
  RxEnvelopeClosed,
  RxActivityLog,
  RxPerson,
} from "react-icons/rx";
import ThemeSwitch from "../ThemeSwitch";
import LogoutModal from "../auth/LogoutModal";

const DashboardSidebar = () => {
  const pathName = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const userRole = session?.user?.role || "user";

  const userLink = [
    { label: "Overview", href: "/dashboard", icon: RxDashboard },
    {
      label: "Booked Classes",
      href: "/dashboard/booked-classes",
      icon: RxCalendar,
    },
    { label: "Favorites", href: "/dashboard/favorites", icon: RxHeart },
    {
      label: "Apply as Trainer",
      href: "/dashboard/apply-as-trainer",
      icon: RxFileText,
    },
  ];

  const trainerLink = [
    { label: "Overview", href: "/dashboard", icon: RxDashboard },
    { label: "Add Class", href: "/dashboard/add-class", icon: RxPlus },
    { label: "My Classes", href: "/dashboard/my-classes", icon: RxLayers },
    {
      label: "Add Forum Post",
      href: "/dashboard/add-forum-post",
      icon: RxFileText,
    },
    { label: "My Posts", href: "/dashboard/my-posts", icon: RxEnvelopeClosed },
  ];

  const adminLink = [
    { label: "Overview", href: "/dashboard", icon: RxDashboard },
    { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: RxPerson },
    {
      label: "Trainer Applications",
      href: "/dashboard/admin/trainer-applications",
      icon: RxFileText,
    },
    {
      label: "Manage Trainers",
      href: "/dashboard/admin/manage-trainers",
      icon: RxLayers,
    },
    {
      label: "Manage Classes",
      href: "/dashboard/admin/manage-classes",
      icon: RxCalendar,
    },
    {
      label: "Add Forum Post",
      href: "/dashboard/add-forum-post",
      icon: RxPlus,
    },
    {
      label: "Forum Posts",
      href: "/dashboard/admin/forum-posts",
      icon: RxEnvelopeClosed,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: RxActivityLog,
    },
  ];

  let currentLinks = userLink;
  if (userRole === "admin") {
    currentLinks = adminLink;
  } else if (userRole === "trainer") {
    currentLinks = trainerLink;
  }

  const sideNav = (
    <nav className="flex flex-col gap-1.5 px-3 mt-4">
      {isPending ? (
        <p className="text-xs text-gray-400 dark:text-neutral-500 text-center animate-pulse py-4">
          Loading menu...
        </p>
      ) : (
        currentLinks.map((item) => {
          const isActive = pathName === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.label} href={item.href} className="w-full block">
              <button
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 text-left ${
                  isActive
                    ? "bg-green-600/10 text-green-600 dark:text-green-400 font-bold border-l-4 border-green-600 pl-3"
                    : "text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-900 hover:text-gray-900 dark:hover:text-white"
                }`}
                type="button"
              >
                <Icon
                  className={`size-5 transition-transform duration-200 ${isActive ? "text-green-600 dark:text-green-400 scale-105" : "text-gray-400 dark:text-neutral-500"}`}
                />
                {item.label}
              </button>
            </Link>
          );
        })
      )}
    </nav>
  );

  const profileCard = (
    <div className="px-4 pb-4 border-b border-gray-100 dark:border-neutral-900 space-y-3">
      {isPending ? (
        <div className="h-16 bg-gray-100 dark:bg-neutral-900 rounded-xl animate-pulse w-full" />
      ) : (
        user && (
          <div className="flex flex-col bg-gray-50 dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-900 rounded-2xl p-3 gap-2 shadow-xs">
            <div className="flex items-center gap-3">
              <Image
                src={
                  user?.image ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                }
                alt={user?.name || "User"}
                width={42}
                height={42}
                className="w-12 h-12 rounded-xl border border-green-500/30 object-cover shadow-inner"
              />
              <div className="flex flex-col gap-0.5 min-w-0">
                <h2 className="font-bold text-sm text-gray-800 dark:text-neutral-200 truncate">
                  {user?.name}
                </h2>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-green-600/10 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-500/10 w-fit">
                  {userRole}
                </span>
              </div>
            </div>

            <div className="w-full bg-green-600/5 dark:bg-green-500/5 border border-green-500/10 rounded-lg px-2.5 py-1.5 min-w-0">
              <p className="text-[11px] text-green-700 dark:text-green-400 truncate font-semibold tracking-wide">
                {user?.email}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );

  return (
    <div>
      <div className="hidden md:flex flex-col bg-white dark:bg-neutral-950 h-screen pt-4 w-64 border-r border-gray-200 dark:border-neutral-800 transition-colors duration-300 sticky top-0 overflow-y-auto">
        <Link
          href="/"
          className="font-bold text-3xl flex items-center justify-center tracking-tight shrink-0"
        >
          <h2 className="bg-linear-to-r from-green-600 dark:from-green-500 to-blue-600 dark:to-blue-500 bg-clip-text text-transparent font-black">
            FitBridge
          </h2>
        </Link>

        <hr className="my-4 border-gray-100 dark:border-neutral-900 shrink-0" />

        {profileCard}

        <div className="flex-1 overflow-y-auto">{sideNav}</div>

        <div className="px-4 pb-4 mt-auto border-t border-gray-100 dark:border-neutral-900 pt-4">
          <LogoutModal />
        </div>
      </div>

      <Drawer>
        <Button
          variant="secondary"
          className="md:hidden dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl absolute top-2 left-4 z-50 border-gray-300 dark:border-neutral-800 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300"
        >
          <FaAlignLeft />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content
            placement="left"
            className="bg-white dark:bg-neutral-950 border-r border-gray-200 dark:border-neutral-800 p-0"
          >
            <Drawer.Dialog className="h-full flex flex-col pt-4">
              <Drawer.CloseTrigger className="top-4 right-4 text-gray-500 dark:text-neutral-400" />

              <div className="px-5 mb-2 flex items-center justify-between pr-14 shrink-0">
                <Link
                  href="/"
                  className="font-bold text-2xl tracking-tight block"
                >
                  <h2 className="bg-linear-to-r from-green-600 dark:from-green-500 to-blue-600 dark:to-blue-500 bg-clip-text text-transparent font-black">
                    FitBridge
                  </h2>
                </Link>
                <div className="sm:hidden block">
                  <ThemeSwitch />
                </div>
              </div>

              <hr className="my-3 border-gray-100 dark:border-neutral-900 mx-4 shrink-0" />

              <Drawer.Body className="p-0 flex-1 flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto">
                  {profileCard}
                  {sideNav}
                </div>

                <div className="px-4 pb-4 mt-auto border-t border-gray-100 dark:border-neutral-900 pt-4 bg-white dark:bg-neutral-950">
                  <LogoutModal />
                </div>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
};

export default DashboardSidebar;
