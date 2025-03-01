"use client"
import React, { Children } from "react";
import NextAuthProvider from "./next-auth";
import ReactQueryProvider from "./react-query";
import { Toaster } from "sonner";
import { AppProgressBar } from "next-nprogress-bar";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <AppProgressBar
          height="4px"
          color="#E3872A"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Toaster position="top-center" richColors={true} />
        {children}
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}
