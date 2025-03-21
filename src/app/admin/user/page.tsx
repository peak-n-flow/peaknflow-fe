import UserDashboardContainer from "@/features/admin/overview/containers/user/user-dashboard-container";
import { getAllUser } from "@/features/admin/overview/services/server";
import React from "react";

export default async function UserAdminDashboardPage() {
  const users = await getAllUser();

  return <UserDashboardContainer users={users} />;
}
