import ServiceForm from "@/features/admin/containers/service/service-form";
import { getServiceById } from "@/features/admin/services/server";
import React from "react";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const service = await getServiceById(id);
  return <ServiceForm service={service} />;
}
