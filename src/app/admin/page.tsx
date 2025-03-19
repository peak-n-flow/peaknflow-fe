import StatsOverview from "@/features/admin/overview/containers/stats-overview";
import { getTotalUser } from "@/features/admin/overview/services/server";
import React from "react";

export default async function DashboardAdminOverviewPage() {
  const totalUsers = await getTotalUser();
  return (
    <main className="flex flex-col gap-8">
      <div className="w-full">
        <h2 className="text-h4 text-black">Overview</h2>
      </div>
      <section className="grid grid-cols-4 gap-3">
        <StatsOverview income={0} reservations={0} users={totalUsers} />
        <div className="col-span-3"></div>
      </section>
    </main>
  );
}
