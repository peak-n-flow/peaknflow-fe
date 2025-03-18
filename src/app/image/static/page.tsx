import Image from "next/image";
import React from "react";
import TransactionIcon from "@/assets/icons/email-icon-transaction.svg";
import LogoBlack from "@/assets/icons/logo.png";

export default function StaticPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Image src={TransactionIcon} alt="" />
      <Image src={LogoBlack} alt="logo" />
    </div>
  );
}
