import ServiceDashboardContainer from "@/features/admin/containers/service/service-dashboard-container";
import { getGymServices } from "@/features/admin/services/server";
import React from "react";

export default async function ServiceAdminDashboardPage() {
  const services = await getGymServices();
  console.log(services)
  if (typeof services === "string") {
    // handle the error case
    return <div>Error: {services}</div>;
  }

  return <ServiceDashboardContainer services={services} />;
}
