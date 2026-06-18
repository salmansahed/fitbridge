"use client";

import React from "react";
import { Input, Button, Link } from "@heroui/react";
import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname();
  if (pathName.includes("dashboard")) {
    return null;
  }

  const socialLinks = [
    { icon: <FaXTwitter />, link: "#" },
    { icon: <FaInstagram />, link: "#" },
    { icon: <FaYoutube />, link: "#" },
    { icon: <FaFacebookF />, link: "#" },
  ];

  const addressLists = [
    { label: "Home", href: "#" },
    { label: "All Classes", href: "#" },
    { label: "Community Forum", href: "#" },
    { label: "Portal Login", href: "#" },
  ];
  return (
    <footer className="w-full bg-gray-800 dark:bg-black border-t border-slate-700 pt-16 pb-8 px-6 sm:px-12 md:px-24 font-sans selection:bg-emerald-500 selection:text-black">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Column 1: Brand Info */}
        <div className="flex flex-col space-y-5">
          <h2 className="text-2xl font-black bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            FitBridge
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 font-normal">
            Elevate your body, mind, and spirit with premium trainers, tailored
            classes, and a supportive community built entirely around your
            lifestyle goals.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-slate-900/50 transition-all duration-300 shadow-sm"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200 border-l-2 border-emerald-400 pl-3">
            Quick Links
          </h4>
          <ul className="flex flex-col space-y-2.5 text-sm">
            {addressLists.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group gap-1"
                >
                  <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-emerald-400 text-xs">
                    ➔
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200 border-l-2 border-emerald-400 pl-3">
            Contact Us
          </h4>
          <ul className="flex flex-col space-y-4 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <span className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 mt-0.5">
                <FaLocationDot size={14} />
              </span>
              <span className="leading-relaxed">
                Bhaluka, Mymensingh, Bangladesh
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                <FaPhone size={14} />
              </span>
              <span>+880 1614-869602</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                <FaEnvelope size={14} />
              </span>
              <span className="truncate">contactsalmansahed@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter Subscriber */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200 border-l-2 border-emerald-400 pl-3">
            Stay Updated
          </h4>
          <p className="text-sm leading-relaxed text-slate-300">
            Subscribe to get expert fitness tips, custom workout guides, and
            exciting class updates.
          </p>
          <div className="flex flex-col space-y-2 pt-1">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-md"
            />
            <Button className="w-full bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-md hover:rounded-3xl shadow-lg shadow-emerald-500/10 transition-all duration-300 group">
              Join Now{" "}
              <FaArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modern linear Custom Divider Line */}
      <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-slate-400 to-transparent opacity-60" />

      {/* Bottom Footer Credits Section */}
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
        <h3 className="text-slate-300">
          © 2026 FitBridge. All Rights Reserved.
        </h3>
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-xs text-slate-300 hover:text-emerald-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs text-slate-300 hover:text-emerald-400 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs text-slate-300 hover:text-emerald-400 transition-colors"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
