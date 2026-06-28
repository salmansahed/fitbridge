import TransactionsTableClient from "@/components/dashboard/admin/TransactionsTableClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const TransactionsPage = async () => {
  let transactions = [];
  let totalRevenue = 0;

    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/transactions`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();

    if (data.success) {
      transactions = data.data;
      totalRevenue = data.totalRevenue;
    }
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
  }

  return (
    <div className="px-6 min-h-screen ">
      <div className="mb-6 shadow-sm rounded-xl p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
        <h1 className="text-2xl sm:text-3xl font-extrabold dark:text-white mb-1">
          Transactions
        </h1>
        {/* Total Transactions Length */}
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Total Transactions:{" "}
          <span className="font-semibold text-xl text-green-500 sm:text-2xl dark:text-green-400">
            {transactions.length}
          </span>
        </p>
        <p className="text-[15px] font-medium text-slate-500 dark:text-zinc-400 mt-2">
          Total Revenue:{" "}
          <span className="font-bold text-xl sm:text-2xl text-[#84cc16]">
            ${totalRevenue}
          </span>
        </p>
      </div>

      <TransactionsTableClient initialTransactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
