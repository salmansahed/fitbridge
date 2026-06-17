"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitch from "../ThemeSwitch";

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

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <div className="bg-white/50 backdrop-blur-lg shadow p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl bg-linear-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
        >
          FitBridge
        </Link>
        <div className="flex items-center space-x-4 text-black">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-pink-700 ${
                pathName === link.href
                  ? "text-pink-600 underline underline-offset-3 decoration-dotted"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-black">Hello, {user.name}</span>
              <Button
                onClick={handleSignOut}
                variant="danger"
                className="rounded-md hover:rounded-3xl transition-all duration-300"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <ThemeSwitch />
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
