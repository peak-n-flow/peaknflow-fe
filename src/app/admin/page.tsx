import StatsOverview from "@/features/admin/overview/containers/stats-overview";
import React from "react";

export default function page() {
  return (
    <main>
      <div className="w-full">
        <h2 className="text-h4 text-black">Overview</h2>
        <section className="grid grid-cols-4 gap-3">
          <StatsOverview />
          <div className="col-span-3"></div>
        </section>
      </div>
    </main>
  );
}
