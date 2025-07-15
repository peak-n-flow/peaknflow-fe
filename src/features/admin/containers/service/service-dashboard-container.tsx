"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import EditIcon from "@/assets/icons/edit.svg";
import { usePathname } from "next/navigation";

export default function ServiceDashboardContainer({
  services,
}: {
  services: Service[];
}) {
  const pathName = usePathname();
  return (
    <main className="flex flex-col gap-5 overflow-x-auto">
      <div className="flex w-full flex-col md:flex-row gap-8 justify-between items-center h-8 py-9">
        <h2 className="text-h5">Service</h2>
        {/* <SearchInput onChange={handleSearchChange} /> */}
      </div>

      <div className="bg-white rounded-2xl flex flex-col gap-4 p-6">
        <span className="text-body-lg">List</span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nama</TableHead>
              <TableHead className="text-center">Harga</TableHead>
              <TableHead className="text-center">Durasi dalam Menit</TableHead>
              <TableHead className="text-center">Slot</TableHead>
              <TableHead className="text-center">Event</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length > 0 ? (
              services.map((service, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="text-center">
                      {service.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {service.price}
                    </TableCell>
                    <TableCell className="text-center">
                      {service.duration_in_minutes}
                    </TableCell>
                    <TableCell className="text-center">
                      {service.slot}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        <Link
                          href={`/admin/service/${service.id}/events`}
                          className="underline text-primary-60"
                        >
                          View Event
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        <Link href={`${pathName}/${service.id}/edit`}>
                          <EditIcon />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Data Is Empty
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* <Pagination meta={users.meta} /> */}
      </div>
    </main>
  );
}
