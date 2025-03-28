import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { ReactNode } from "react";

export default function StatsCard({
  icon,
  title,
  count,
  stats,
}: {
  icon: ReactNode;
  title: string;
  count: number;
  stats: string;
}) {
  return (
    <div className="p-4 md:p-6 flex flex-col gap-6 bg-white rounded-3xl ">
      <div className="flex items-center gap-4 max-w-44">
        <div className="bg-primary-20 rounded-full p-2.5 ">{icon}</div>
        <span className="text-[#080C18] text-body-md md:text-body-lg">
          {title}
        </span>
      </div>
      <div className="text-body-md flex gap-1 items-end">
        <span className="text-display-sm font-semibold">{count}</span>
        <span className="text-[#080C18] mb-2">{stats}</span>
      </div>
    </div>
  );
}
