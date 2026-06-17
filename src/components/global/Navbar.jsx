"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitch from "../ThemeSwitch";
import { RiDashboardFill } from "react-icons/ri";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import LogoutModal from "../auth/LogoutModal";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Classes", href: "/all-classes" },
    { name: "Community Forum", href: "/community-forum" },
  ];

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="bg-white/50 dark:bg-black/10 backdrop-blur-sm shadow dark:shadow-gray-800 p-4 fixed top-0 left-0 right-0 z-50">
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
              className={`hover:text-blue-700 dark:hover:text-blue-500 transition-all duration-200 ${
                pathName === link.href
                  ? "text-green-700 dark:text-green-500 underline underline-offset-3 decoration-blue-700 dark:decoration-green-500"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-5">
          <ThemeSwitch />
          {user ? (
            <>
              <Button className="rounded-md hover:rounded-3xl transition-all duration-300 bg-linear-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700">
                Dashboard <RiDashboardFill />
              </Button>
              <div className="border border-black/20 h-8" />
              <div className="flex gap-2">
                <Image
                  src={user?.image}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-cover border-2 border-blue-500"
                />
                <div className="flex flex-col justify-center text-xs text-gray-700 dark:text-gray-300">
                  <h2>
                    {user?.name
                      ? user.name.split(" ").slice(0, 2).join(" ")
                      : ""}
                  </h2>{" "}
                  <h2>ADMIN</h2>
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
      </div>
    </div>
  );
};

export default Navbar;
