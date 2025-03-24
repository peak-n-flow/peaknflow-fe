import StatsOverview from "@/features/admin/containers/overview/stats-overview";
import TransactionTable from "@/features/admin/containers/overview/transaction-table";
import {
  getAllTransactions,
  getTotalBookedHoursThisDay,
  getTotalUser,
  getTransactionsSummary,
} from "@/features/admin/services/server";
import React from "react";

export default async function DashboardAdminOverviewPage() {
  const totalUsers = await getTotalUser();
  const revenue = await getTransactionsSummary();
  const totalBookedHours = await getTotalBookedHoursThisDay();
  const transactions = await getAllTransactions();
  return (
    <main className="flex flex-col gap-8">
      <div className="w-full">
        <h2 className="text-h4 text-black">Overview</h2>
      </div>
      <section className="grid grid-cols-1 xl:grid-cols-4 gap-3">
        <StatsOverview
          income={revenue}
          reservations={totalBookedHours}
          users={totalUsers}
        />
        <div className="col-span-3 overflow-x-auto">
          {typeof transactions === 'object' && transactions !== null ? (
            <TransactionTable transactions={transactions.transactions} />
          ) : (
            <div>Error loading transactions</div>
          )}
        </div>
      </section>
    </main>
  );
}
