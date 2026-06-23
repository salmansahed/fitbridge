import { stripe } from "@/lib/stripe";
import { Button } from "@heroui/react";
import Link, { redirect } from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { MdOutlineReceiptLong, MdLink } from "react-icons/md";

export default async function PaymentSuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) return redirect("/");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent.latest_charge"],
  });

  const {
    metadata,
    customer_details,
    amount_total,
    payment_intent,
    created,
    status,
  } = session;

  const {
    className,
    classId,
    userId,
    startTime,
    scheduleDays,
    authorRole,
    authorName,
  } = metadata || {};

  const parsedScheduleDays = scheduleDays ? JSON.parse(scheduleDays) : [];
  const { email } = customer_details || {};

  const invoiceUrl = payment_intent?.latest_charge?.receipt_url || null;

  const transactionId = payment_intent?.id || "N/A";

  const paymentDate = new Date(created * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const paymentTime = new Date(created * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const finalDataForDatabase = {
    classId,
    className,
    customerEmail: email,
    classPrice: amount_total / 100,
    status,
    userId,
    paymentTime,
    paymentDate,
    transactionId,
    startTime,
    scheduleDays: parsedScheduleDays,
    authorRole,
    authorName,
    invoiceUrl,
  };

  if (status === "complete") {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...finalDataForDatabase }),
    });
  }

  return (
    <div className="py-28 bg-neutral-50 dark:bg-black min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-xl text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <HiOutlineCheckCircle className="text-6xl text-[#72c113]" />
        </div>

        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-1">
          Payment Successful!
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
          Your training slot has been secured.
        </p>

        {/* Transaction Summary */}
        <div className="bg-neutral-50 dark:bg-gray-800 border border-neutral-100 dark:border-neutral-700 rounded-2xl p-5 text-left flex flex-col gap-4 mb-8">
          <p className="text-[10px] font-black uppercase text-neutral-400 dark:text-neutral-500 border-b border-neutral-200 dark:border-neutral-700 pb-2 flex items-center gap-1.5">
            <MdOutlineReceiptLong className="text-sm text-[#72c113]" />{" "}
            Transaction Summary
          </p>

          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-neutral-400 dark:text-neutral-500">
              Transaction ID
            </span>
            <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-300">
              {transactionId}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-neutral-400 dark:text-neutral-500">
              Date
            </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {paymentDate} at {paymentTime}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-neutral-400 dark:text-neutral-500">
              Class
            </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {className || "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-neutral-400 dark:text-neutral-500">
              Email
            </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {email}
            </span>
          </div>

          {invoiceUrl && (
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-neutral-400 dark:text-neutral-500">
                Receipt
              </span>
              <a
                href={invoiceUrl}
                target="_blank"
                className="text-[#72c113] font-bold flex items-center gap-1 hover:underline"
              >
                View Receipt <MdLink />
              </a>
            </div>
          )}

          <div className="flex justify-between items-center text-xs border-t border-dashed border-neutral-200 dark:border-neutral-700 pt-3">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              Total Paid
            </span>
            <span className="text-lg font-black text-blue-600 dark:text-blue-400">
              ${amount_total / 100}
            </span>
          </div>
        </div>

        {/* Go To Dashboard Button */}
        <div className="flex flex-col gap-3">
          <Link href="/dashboard" className="w-full">
            <Button className="w-full text-white py-6 rounded-md hover:rounded-3xl font-bold text-sm bg-linear-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700 transition-all duration-300 group">
              <FaArrowLeft className="group-hover:-translate-x-2 transition-all duration-300" />
              Go To Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
