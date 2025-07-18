import UserDashboardContainer from "@/features/admin/containers/user/user-dashboard-container";
import { getAllUser } from "@/features/admin/services/server";
import React from "react";

export default async function UserAdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number; search: string }>;
}) {
  const limit = 10;
  const { page, search } = await searchParams;
  const users = await getAllUser(page, limit, search);

  return <UserDashboardContainer users={users} />;
}
