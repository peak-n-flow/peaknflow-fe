import { Sidebar } from "@/components/sidebar";
import { fetchProfileWithRetry } from "@/features/admin/services/server";
import { authOptions } from "@/lib/auth-options";
import { decodeJwt } from "@/lib/decode";
import { API_KEY, BASE_URL } from "@/lib/env";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  const decoded = decodeJwt(session?.user.access_token ?? "");
  if (!decoded || decoded.role === "user") {
    redirect("/auth/login");
  }

  // Use the retry function to get profile data
  const profile = await fetchProfileWithRetry(session?.user.access_token);

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Sidebar user={profile.payload?.user ?? {}} />
      <main className="text-black pl-0 md:pl-[35vh] xl:pl-[30vh] 2xl:pl-[40vh] min-h-screen transition-all duration-300">
        <div className="p-6 md:p-8 flex flex-col gap-">
          <div className="w-full py-8">
            <h2 className="text-h4 text-black">
              Selamat Datang, {profile.payload.user.name}
            </h2>
          </div>
          <div className="py-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
