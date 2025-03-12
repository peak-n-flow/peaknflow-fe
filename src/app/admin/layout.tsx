import { Sidebar } from "@/components/sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
