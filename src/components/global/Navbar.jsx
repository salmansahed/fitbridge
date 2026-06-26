"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitch from "../ThemeSwitch";
import { RiDashboardFill } from "react-icons/ri";
import Image from "next/image";
import LogoutModal from "../auth/LogoutModal";
import { Sling as Hamburger } from "hamburger-react";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const pathName = usePathname();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Classes", href: "/all-classes" },
    { name: "Community Forum", href: "/community-forum" },
  ];

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (pathName.includes("dashboard")) {
    return null;
  }

  return (
    <div className="bg-white/50 dark:bg-black/10 backdrop-blur-sm shadow dark:shadow-gray-800 py-2 sm:py-4 px-3 sm:px-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl bg-linear-to-r from-green-600 dark:from-green-500 to-blue-600 dark:to-blue-500 bg-clip-text text-transparent"
        >
          FitBridge
        </Link>
        <div className="flex items-center space-x-4 text-black dark:text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-blue-700 dark:hover:text-blue-500 transition-all duration-200 text-sm lg:text-base hidden md:block select-none ${
                pathName === link.href
                  ? "text-green-700 dark:text-green-500 underline underline-offset-3 decoration-blue-700 dark:decoration-green-500"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
          <ThemeSwitch />
          {isPending ? (
            <>
              <div className="bg-white h-8 shadow-lg animate-pulse rounded-md w-22" />
              <div className="bg-white h-8 shadow-lg animate-pulse rounded-md w-22" />
              <div className="w-8 h-8 bg-white rounded-full shadow-lg animate-pulse" />
            </>
          ) : user ? (
            <>
              <Link href="/dashboard">
                <Button className="rounded-md hover:rounded-3xl transition-all duration-300 bg-linear-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700">
                  Dashboard <RiDashboardFill />
                </Button>
              </Link>
              <div className="border border-black/20 h-8" />
              <div className="flex gap-2">
                <Image
                  src={user?.image}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="lg:flex flex-col justify-center text-xs text-gray-700 dark:text-gray-300 hidden">
                  <h2>
                    {user?.name
                      ? user.name.split(" ").slice(0, 2).join(" ")
                      : ""}
                  </h2>{" "}
                  <h2 className="capitalize">{user?.role || "User"}</h2>
                </div>
              </div>
              <LogoutModal />
            </>
          ) : (
            <>
              <Link href="/register">
                <Button className="text-white bg-green-600 rounded-md hover:bg-green-700 hover:rounded-3xl transition-all duration-300">
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md hover:rounded-3xl transition-all duration-300">
                  Log In
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Menu Button */}
          <ThemeSwitch />
          <Hamburger toggled={isOpen} toggle={setOpen} size={25} />
        </div>
      </div>
      {isOpen && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 h-screen w-screen bg-black/30 cursor-pointer z-40"
          />
          <div className="fixed top-16 sm:top-20 right-3 left-3 mt-2 bg-white border border-black/20 dark:bg-gray-800 rounded-md shadow-lg py-2 px-3 z-50">
            {navLinks.map((link) => (
              <Link
                onClick={() => setOpen(false)}
                key={link.href}
                href={link.href}
                className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 select-none"
              >
                {link.name}
              </Link>
            ))}
            <hr className="my-2 border-gray-400 dark:border-gray-700" />
            {isPending ? (
              <div className="flex flex-col gap-2 py-4">
                <div className="bg-white h-8 shadow-lg animate-pulse rounded-md w-full" />
                <div className="bg-white h-8 shadow-lg animate-pulse rounded-md w-full" />
              </div>
            ) : user ? (
              <div>
                <div className="flex items-center gap-2 py-2">
                  <Image
                    src={user?.image}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-blue-500"
                  />
                  <div className="flex flex-col justify-center text-sm text-gray-700 dark:text-gray-300">
                    <h3>{user?.name || "User"}</h3>
                    <h3 className="capitalize">{user?.role || "User"}</h3>
                  </div>
                </div>
                <div className="space-y-3 mt-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block w-full"
                  >
                    <Button className="rounded-md hover:rounded-3xl transition-all duration-300 w-full bg-linear-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700">
                      Dashboard <RiDashboardFill />
                    </Button>
                  </Link>
                  <LogoutModal />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 py-4">
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="text-white w-full bg-green-600 rounded-md hover:bg-green-700 hover:rounded-3xl transition-all duration-300">
                    Register
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="bg-blue-600 w-full text-white hover:bg-blue-700 rounded-md hover:rounded-3xl transition-all duration-300">
                    Log In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
