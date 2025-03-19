import React from "react";
import StatsCard from "../components/stats-card";

export default function StatsOverview({
  users,
  reservations,
  income,
}: {
  users: number;
  reservations: number;
  income: number;
}) {
  return (
    <div className="col-span-1 grid grid-cols-1 gap-3">
      <StatsCard title="Total Users" count={users} stats="users" />
      <StatsCard title="Total Orders" count={reservations} stats="orders" />
      <StatsCard title="Total Revenue" count={income} stats="revenue" />
    </div>
  );
}
