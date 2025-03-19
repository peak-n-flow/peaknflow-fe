import React from "react";
import StatsCard from "../components/stats-card";
import CalendarIcon from "@/assets/icons/calendar.svg";
import RevenueIcon from "@/assets/icons/revenue.svg";
import UserIcon from "@/assets/icons/user.svg";

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
      <StatsCard
        icon={CalendarIcon}
        title="Reservasi Hari ini"
        count={reservations}
        stats="orders"
      />
      <StatsCard
        icon={UserIcon}
        title="Total User"
        count={users}
        stats="users"
      />
      <StatsCard
        icon={RevenueIcon}
        title="Total Pendapatan"
        count={income}
        stats="revenue"
      />
    </div>
  );
}
