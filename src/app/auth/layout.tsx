import AuthBackground from "@/assets/images/auth-background.jpg";
import React from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative h-screen bg-secondary-80 p-3 sm:p-5 md:p-[5vh] z-0">
      <div
        style={{
          backgroundImage: `url(${AuthBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex h-full justify-between items-stretch p-4 sm:p-8 md:p-16 rounded-2xl"
      >
        <h1 className="hidden xl:block text-display-lg text-white z-10 font-normal max-w-2xl self-end">
          Versi Terbaik Dirimu Dimulai di Sini
        </h1>
        {children}
      </div>
    </main>
  );
}
