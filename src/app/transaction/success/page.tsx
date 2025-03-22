"use client";
import React from "react";
import Lottie from "lottie-react";
import SuccessAnimation from "@/assets/animation/success.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function TransactionSuccessPage() {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="p-4 md:p-16 bg-white rounded-lg shadow-lg flex flex-col items-center gap-10">
        <Lottie
          animationData={SuccessAnimation}
          loop={true}
          className="w-48 h-48"
        />
        <h1 className="text-black font-medium text-h1 md:text-display-sm">
          Transaction Success
        </h1>
        <Link href="/">
          <Button>Back To Home</Button>
        </Link>
      </div>
    </main>
  );
}
