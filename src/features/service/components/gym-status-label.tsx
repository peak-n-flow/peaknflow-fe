import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import React from "react";

export default function GymStatusLabel({
  status,
}: {
  status: "closed" | "booked";
}) {
  const variantStyles =
    status === "closed"
      ? "bg-[#C0CFC51C] text-light-100"
      : "bg-[#C0CFC51C] text-secondary-20";
  return (
    <div
      className={cn(
        variantStyles,
        "text-xs md:text=sm flex gap-1.5 items-center py-1 px-2 absolute top-2 right-2 rounded-sm"
      )}
    >
      <Dot
        className={`w-4 h-4 ${status == "closed" ? "" : "bg-secondary-60"}`}
      />
      <span>{status === "closed" ? "Closed" : "Booked"}</span>
    </div>
  );
}
