import TransactionsTableClient from "@/components/dashboard/admin/TransactionsTableClient";
import React from "react";

const TransactionsPage = async () => {
  let transactions = [];
  let totalRevenue = 0;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/transactions`,
      {
        cache: "no-store",
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
      <h1 className="text-[28px] font-extrabold dark:text-white mb-1">
        Transactions
      </h1>
      <p className="text-[15px] font-medium text-slate-500 mb-6">
        Total Revenue:{" "}
        <span className="font-bold text-2xl text-[#84cc16]">${totalRevenue}</span>
      </p>

      <TransactionsTableClient initialTransactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
