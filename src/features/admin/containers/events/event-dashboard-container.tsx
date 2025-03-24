"use client";
import React, { useState } from "react";
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
import DeleteIcon from "@/assets/icons/delete.svg";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/date";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { toast } from "sonner";
import { deleteEvent } from "../../services/client";
import { useRouter } from "next/navigation";

export default function EventDashboardContainer({
  events,
}: {
  events: Event[];
}) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<{
    id: string;
    service_id: string;
  } | null>(null);
  const pathName = usePathname();

  const handleDeleteClick = (id: string, serviceId: string) => {
    setEventToDelete({ id, service_id: serviceId });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      try {
        await deleteEvent(eventToDelete.service_id, eventToDelete.id);
        toast.success("Event deleted successfully");
        router.reload();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsDeleteModalOpen(false);
        setEventToDelete(null);
      }
    }
  };
  return (
    <main className="flex flex-col gap-5 overflow-x-auto">
      <div className="flex w-full flex-col md:flex-row gap-8 justify-between items-center h-8 py-9">
        <h2 className="text-h5">Service Events</h2>
        {/* <SearchInput onChange={handleSearchChange} /> */}

        <Link href={`${pathName}/add`}>
          <Button>Add Events</Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl flex flex-col gap-4 p-6">
        <span className="text-body-lg">List</span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nama</TableHead>
              <TableHead className="text-center">Harga</TableHead>
              <TableHead className="text-center">Kuota</TableHead>
              <TableHead className="text-center">Tanggal Mulai</TableHead>
              <TableHead className="text-center">Tanggal Berakhir</TableHead>
              <TableHead className="text-center">Jam Mulai</TableHead>
              <TableHead className="text-center">Jam Berakhir</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map((event, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="text-center">{event.name}</TableCell>
                    <TableCell className="text-center">{event.price}</TableCell>
                    <TableCell className="text-center">{event.slot}</TableCell>
                    <TableCell className="text-center">
                      {new Date(event.start_date).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(event.end_date).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatTime(event.start_time)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatTime(event.end_time)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        <Link href={`${pathName}/${event.id}/edit`}>
                          <EditIcon />
                        </Link>
                        <DeleteIcon
                          className="cursor-pointer"
                          onClick={() =>
                            handleDeleteClick(event.id, event.service_id)
                          }
                        />
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
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Hapus Event"
        description="Apakah anda yakin untuk menghapus event ini?"
        cancelText="Kembali"
        confirmText="Iya, saya yakin"
        variant="delete"
      />
    </main>
  );
}
