"use client";

import React, { Suspense } from "react";
import TransactionContainer from "@/features/service/containers/transaction-container";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: any) => void;
    };
  }
}

function TransactionContent() {
  const searchParams = useSearchParams();
  const snapToken = searchParams.get("snapToken");

  if (!snapToken) {
    return <p>Error: snapToken is missing</p>;
  }

  return <TransactionContainer snapToken={snapToken} />;
}

export default function TransactionSnapPage() {
  return (
    <Suspense fallback={<p>Loading transaction details...</p>}>
      <TransactionContent />
    </Suspense>
  );
}
