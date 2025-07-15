import TransactionDashboardContainer from "@/features/admin/containers/transactions/transaction-dashboard-container";
import { getAllTransactions } from "@/features/admin/services/server";
import React from "react";

export default async function TrransactionAdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number; search: string }>;
}) {
  const limit = 10;
  const { page, search } = await searchParams;
  const transactions = await getAllTransactions(page, limit, search);

  return (
    <>
      {typeof transactions === "object" ? (
        <TransactionDashboardContainer transactions={transactions} />
      ) : (
        <div>Error loading transactions</div>
      )}
    </>
  );
}
