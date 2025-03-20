import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="bg-white rounded-2xl flex flex-col gap-4 p-6">
      <span className="text-body-lg">Riwayat Transaksi Terakhir</span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center justify-center">Code</div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-center">Name</div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-center">Service</div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-center">Time</div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-center">Price</div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-center">Status</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.slice(0, 5).map((transaction, index) => {
            const startTime = new Date(transaction.service_start_at);
            const endTime = new Date(transaction.service_end_at);
            const formattedTime = `${startTime
              .toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(".", ":")}-${endTime
              .toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(".", ":")} ${startTime.toISOString().split("T")[0]}`;

            return (
              <TableRow key={index}>
                <TableCell className="text-center">
                  {transaction.code}
                </TableCell>
                <TableCell className="text-center">
                  {transaction.code}
                </TableCell>
                <TableCell className="text-center">
                  {transaction.service_name}
                </TableCell>
                <TableCell className="text-center">{formattedTime}</TableCell>
                <TableCell className="text-center">
                  {transaction.final_price}
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <Badge
                    variant={
                      transaction.payment_status === "pending"
                        ? "secondary"
                        : transaction.payment_status === "success"
                        ? "default"
                        : "destructive"
                    }
                    className="flex items-center gap-1.5"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        transaction.payment_status === "pending"
                          ? "bg-[#FFBD00]"
                          : transaction.payment_status === "success"
                          ? "bg-[#037847]"
                          : "bg-destructive"
                      }`}
                    />
                    {transaction.payment_status === "pending"
                      ? "Proses"
                      : transaction.payment_status === "success"
                      ? "Sukses"
                      : "Gagal"}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
