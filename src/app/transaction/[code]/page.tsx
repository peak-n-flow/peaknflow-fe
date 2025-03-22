import TransactionContainer from "@/features/service/containers/transaction-container";

export default async function TransactionSnapPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;
  return <TransactionContainer snapToken={token} />;
}
