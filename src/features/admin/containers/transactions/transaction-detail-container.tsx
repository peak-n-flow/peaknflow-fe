import React from "react";
import { CircleIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function TransactionDetailContainer({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-body-md text-dark-20">
        <Link href={"/admin/transaction"}>Transaction</Link> &gt;{" "}
        <span className="text-black">Detail Transaksi</span>
      </div>
      <div className="grid xl:grid-cols-2 gap-6 p-4 bg-white rounded-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-h6 text-dark-100 font-medium">Reservation Detail</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium">
                Code
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="code"
                value={transaction.code}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="name"
                value={transaction.user_name}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="email"
                value={transaction.user_email}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone number
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="phone"
                value={transaction.user_phone_number}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-medium">
                Service
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="service"
                value={transaction.service_name}
                readOnly
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-h6 text-dark-100 font-medium">Transaction</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="schedule" className="text-sm font-medium">
                Schedule
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="schedule"
                value={`${new Date(
                  transaction.service_start_at
                ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(
                  transaction.service_end_at
                ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${new Date(
                  transaction.service_start_at
                ).toLocaleDateString()}`}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <div className="px-4 flex items-center h-12 rounded-xl border border-[#CFD3D4]">
                <Badge
                  variant={
                    transaction.payment_status === "pending"
                      ? "secondary"
                      : transaction.payment_status === "success"
                      ? "default"
                      : "destructive"
                  }
                  className="flex items-center self-center gap-1.5 w-min"
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
              </div>
            </div>
            {/* <div className="space-y-2">
              <label htmlFor="voucher" className="text-sm font-medium">
                Voucher
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="voucher"
                value={transaction.voucher_code}
                readOnly
                placeholder="-"
              />
            </div> */}
            {/* <div className="space-y-2">
              <label htmlFor="raw-price" className="text-sm font-medium">
                Raw price
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="raw-price"
                placeholder="-"
                readOnly
              />
            </div> */}
            <div className="space-y-2">
              <label htmlFor="final-price" className="text-sm font-medium">
                Final price
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="final-price"
                placeholder="-"
                value={transaction.final_price}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="created-at" className="text-sm font-medium">
                Transaction Date
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="created-at"
                value={new Date(transaction.created_at).toLocaleString()}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="payment method" className="text-sm font-medium">
                Payment Method
              </label>
              <Input
                className="rounded-xl text-[#ABAFB1] text-body-lg"
                id="expired-at"
                value={transaction.payment_method}
                readOnly
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
