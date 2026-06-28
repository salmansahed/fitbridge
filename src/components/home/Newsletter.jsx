"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import {
  RiMailSendLine,
  RiNotificationBadgeLine,
  RiCheckDoubleLine,
} from "react-icons/ri";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-20 dark:bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-linear-to-r from-blue-500/5 to-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center space-y-8">
        {/* Top Badge */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <RiNotificationBadgeLine className="text-sm animate-bounce" /> Stay
            In the Loop
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Get Weekly Intel. <br />
            <span className="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              No Spam. Just Power.
            </span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            Subscribe to the FitBridge newsletter and receive exclusive workout
            blueprints, AI-driven nutrition guides, and high-performance
            bio-hacking tips delivered straight to your inbox.
          </p>
        </div>

        {/* Subscription Form */}
        <div className="max-w-xl mx-auto">
          {!isSubscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl border border-gray-200/80 dark:border-neutral-800/80 bg-gray-50/50 dark:bg-neutral-900/30 backdrop-blur-md shadow-xs"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your professional email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-transparent text-gray-900 dark:text-white font-semibold text-sm focus:outline-hidden placeholder:text-gray-400 dark:placeholder:text-neutral-600"
                />
              </div>

              {/* Gradient Button */}
              <Button
                type="submit"
                className="font-bold text-white bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-md hover:rounded-3xl px-6 py-6 sm:py-5 text-sm shadow-md transition-all duration-300 shrink-0"
              >
                Subscribe Now <RiMailSendLine className="text-base" />
              </Button>
            </form>
          ) : (
            // Success Message
            <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-green-600 dark:text-green-400 flex items-center justify-center gap-3 animate-fadeIn">
              <div className="p-1.5 rounded-full bg-green-500 text-white shrink-0">
                <RiCheckDoubleLine className="text-base" />
              </div>
              <p className="text-sm font-bold tracking-wide">
                You&apos;re in! Welcome to the elite squad. Check your inbox soon.
              </p>
            </div>
          )}
        </div>

        {/* Privacy Notice */}
        <p className="text-xs font-semibold text-gray-400 dark:text-neutral-500 tracking-wide">
          Your data security is paramount. Unsubscribe at any time with a single
          click.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
