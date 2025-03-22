import React from "react";
import CalendarIcon from "@/assets/icons/calendar.svg";
import RevenueIcon from "@/assets/icons/revenue.svg";
import UserIcon from "@/assets/icons/user.svg";
import StatsCard from "../../components/stats-card";

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
    <div className="col-span-1 grid gap-8 grid-cols-1 lg:grid-cols-3 xl:grid-cols-1 xl:gap-3">
      <StatsCard
        icon={CalendarIcon}
        title="Reservasi Hari ini"
        count={reservations}
        stats="jam"
      />
      <StatsCard
        icon={UserIcon}
        title="Total User"
        count={users}
        stats="User"
      />
      <StatsCard
        icon={RevenueIcon}
        title="Total Pendapatan"
        count={income}
        stats="Rupiah"
      />
    </div>
  );
}
