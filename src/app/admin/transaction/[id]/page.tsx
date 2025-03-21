import TransactionDetailContainer from "@/features/admin/overview/containers/transactions/transaction-detail-container";
import { getTransactionById } from "@/features/admin/overview/services/server";

export default async function TransactionDetailAdminPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const res = await getTransactionById(id);

  return <TransactionDetailContainer transaction={res} />;
}
