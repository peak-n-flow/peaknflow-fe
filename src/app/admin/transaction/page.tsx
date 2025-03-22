import TransactionDashboardContainer from "@/features/admin/overview/containers/transactions/transaction-dashboard-container";
import { getAllTransactions } from "@/features/admin/overview/services/server";
import React from "react";

export default async function TrransactionAdminDashboardPage() {
  const transactions = await getAllTransactions();
  return <TransactionDashboardContainer transactions={transactions??[]} />;
}
