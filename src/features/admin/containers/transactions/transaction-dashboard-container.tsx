"use client";
import DetailIcon from "@/assets/icons/detail.svg";
import { Pagination } from "@/components/pagination";
import { SearchInput } from "@/components/search/input";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchQuery } from "@/hooks/use-search-query";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TransactionDashboardContainer({
  transactions,
}: {
  transactions: { transactions: Transaction[]; meta: Meta };
}) {
  const handleSearchChange = useSearchQuery("search", 300);

  return (
    <main className="flex flex-col gap-5 overflow-x-auto w-full">
      <div className="flex w-full flex-col md:flex-row gap-8 justify-between items-center h-8 py-9">
        <h2 className="text-h5">Transaction</h2>
        {/* <div className="max-w-screen-sm w-full mr-4 flex items-center gap-3 bg-transparent border-light-100 border rounded-lg">
          <Search />
          <Input
            className="w-full bg-transparent h-8 border-0"
            onChange={handleSearchChange}
          />
        </div> */}
        <SearchInput
          className="w-full bg-transparent h-10 bg-white max-w-screen-sm"
          onChange={handleSearchChange}
        />
      </div>

      <div className="bg-white rounded-2xl flex flex-col gap-4 p-6">
        <span className="text-body-lg">List</span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Code</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Phone Number</TableHead>
              <TableHead className="text-center">Service</TableHead>
              <TableHead className="text-center">Time</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.transactions.length > 0 ? (
              transactions.transactions.map((transaction, index) => {
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
                      {transaction.user_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.user_phone_number}
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.service_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {formattedTime}
                    </TableCell>
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
                    <TableCell className="text-center">
                      <Link
                        href={`/admin/transaction/${transaction.id}`}
                        className="flex justify-center items-center"
                      >
                        <DetailIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  Data Is Empty
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination meta={transactions.meta} />
      </div>
    </main>
  );
}
