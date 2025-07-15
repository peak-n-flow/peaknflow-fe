"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatToLocalISO } from "@/lib/date";
import { getId } from "@/lib/get-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { TransactionRequest } from "../types";

const bookingFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone_number: z.string().regex(/^\+\d{10,15}$/, {
    message: "Must format (e.g., +62XXXXXXXXXX).",
  }),
  hour: z.number().min(1, { message: "Hour must be at least 1." }).optional(),
  quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
  payment_method: z.string().min(1, { message: "Payment method is required." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingDialogProps {
  user?: User;
  open: boolean;
  selectedSlot: string | null;
  onClose: () => void;
  onConfirm: (transaction: TransactionRequest) => void;
  serviceType: string;
  maxBookHour: number;
  durationInHour: number;
  maxBookQuantity?: number;
  isClass?: boolean;
}

export default function BookingModal({
  open,
  selectedSlot,
  onClose,
  onConfirm,
  user,
  serviceType,
  maxBookHour,
  durationInHour,
  maxBookQuantity,
  isClass = false,
}: BookingDialogProps) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone_number: user?.phone_number ?? "",
      hour: isClass ? undefined : durationInHour ?? 1,
      quantity: 1,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? "",
        email: user.email ?? "",
        phone_number: user.phone_number ?? "",
        hour: durationInHour ?? 1,
        quantity: 1,
      });
    }
  }, [user, form]);

  useEffect(() => {
    const subscription = form.watch((_, { name }) => {
      if (name) {
        console.log("Form errors:", form.formState.errors);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  if (!selectedSlot) return null;

  const onSubmit = async (values: BookingFormValues) => {
    const startDate = new Date(selectedSlot);
    const endDate = new Date(startDate);
    const hoursBooking = isClass ? durationInHour : values.hour ?? 1;
    endDate.setHours(endDate.getHours() + hoursBooking);

    const transactionRequest: TransactionRequest = {
      service_id: getId(serviceType) ?? "",
      start_at: formatToLocalISO(startDate),
      end_at: formatToLocalISO(endDate),
      user_name: values.name,
      user_email: values.email,
      user_phone_number: values.phone_number,
      quantity: values.quantity ?? 1,
      payment_method: values.payment_method ?? "gopay",
    };

    await onConfirm(transactionRequest);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-secondary-80 border-secondary-60 sm:max-w-md p-10">
        <DialogHeader className="text-center gap-2">
          <DialogTitle className="text-center text-light-20 text-h4 md:text-h1">
            Form Reservation
          </DialogTitle>
          <DialogDescription className="text-center text-light-100 text-body-lg">
            Complete the form below to book your gym session.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                const hasError = !!form.formState.errors.name;
                return (
                  <FormItem className="relative">
                    <FormLabel
                      className={`absolute left-3 top-1 text-xs autofill-dark [&:has(+_input:-webkit-autofill)]:text-white ${
                        hasError
                          ? "text-danger-40"
                          : "bg-transparent text-light-60"
                      }`}
                    >
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Enter your name"
                        {...field}
                        className={`pt-6 text-light-60 autofill-dark ${
                          hasError
                            ? "border-danger-40 bg-transparent text-danger-40"
                            : "bg-transparent border border-secondary-60 text-light-60"
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="absolute right-3 top-0.5 text-danger-40 text-xs" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const hasError = !!form.formState.errors.email;
                return (
                  <FormItem className="relative">
                    <FormLabel
                      className={`absolute left-3 top-1 text-xs autofill-dark [&:has(+_input:-webkit-autofill)]:text-white ${
                        hasError
                          ? "text-danger-40"
                          : "bg-transparent text-light-60"
                      }`}
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className={`pt-6 text-light-60 autofill-dark ${
                          hasError
                            ? "border-danger-40 bg-transparent text-danger-40"
                            : "bg-transparent border border-secondary-60 text-light-60"
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="absolute right-3 top-0.5 text-danger-40 text-xs" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => {
                const hasError = !!form.formState.errors.phone_number;
                return (
                  <FormItem className="relative">
                    <FormLabel
                      className={`absolute left-3 top-1 text-xs autofill-dark [&:has(+_input:-webkit-autofill)]:text-white ${
                        hasError
                          ? "text-danger-40"
                          : "bg-transparent text-light-60"
                      }`}
                    >
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="+62XXXXXXXXXX"
                        {...field}
                        className={`pt-6 text-light-60 autofill-dark ${
                          hasError
                            ? "border-danger-40 bg-transparent text-danger-40"
                            : "bg-transparent border border-secondary-60 text-light-60"
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="absolute right-3 top-0.5 text-danger-40 text-xs" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => {
                const hasError = !!form.formState.errors.payment_method;
                return (
                  <FormItem className="relative">
                    <FormLabel
                      className={`text-white absolute left-3 top-1 text-xs ${
                        hasError ? "text-danger-40" : "text-white"
                      }`}
                    >
                      Payment Method
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={`pt-6 h-12 ${
                            hasError
                              ? "border-danger-40 bg-transparent"
                              : "bg-transparent border border-secondary-60"
                          }`}
                        >
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gopay">GoPay</SelectItem>
                          <SelectItem value="mandiri_bank_transfer">
                            Mandiri
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="absolute right-3 top-0.5 text-danger-40 text-xs" />
                  </FormItem>
                );
              }}
            />
            {isClass ? (
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => {
                  const hasError = !!form.formState.errors.quantity;
                  return (
                    <FormItem className="relative">
                      <FormLabel
                        className={`text-white absolute left-3 top-1 text-xs h-12 ${
                          hasError ? "text-danger-40" : "text-white"
                        }`}
                      >
                        Quantity (Max {maxBookQuantity} people)
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={(field.value ?? "").toString()}
                        >
                          <SelectTrigger
                            className={`pt-6 h-12 ${
                              hasError
                                ? "border-danger-40 bg-transparent"
                                : "bg-transparent border border-secondary-60"
                            }`}
                          >
                            <SelectValue placeholder="Select booking hours" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(
                              { length: maxBookQuantity ?? 0 },
                              (_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={(i + 1).toString()}
                                >
                                  {i + 1} people{i + 1 > 1 ? "s" : ""}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="absolute right-3 top-0.5 text-danger-40 text-xs" />
                    </FormItem>
                  );
                }}
              />
            ) : (
              <FormField
                control={form.control}
                name="hour"
                render={({ field }) => {
                  const hasError = !!form.formState.errors.hour;
                  return (
                    <FormItem className="relative">
                      <FormLabel
                        className={`text-white absolute left-3 top-1 text-xs h-12 ${
                          hasError ? "text-danger-40" : "text-white"
                        }`}
                      >
                        Booking Hours (Max {maxBookHour} hours)
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={(field.value ?? "").toString()}
                        >
                          <SelectTrigger
                            className={`pt-6 h-12 ${
                              hasError
                                ? "border-danger-40 bg-transparent"
                                : "bg-transparent border border-secondary-60"
                            }`}
                          >
                            <SelectValue placeholder="Select booking hours" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: maxBookHour }, (_, i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString()}
                              >
                                {i + 1 * durationInHour} hour
                                {i + 1 > 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="absolute right-3 top-0.5 text-danger-40 text-xs" />
                    </FormItem>
                  );
                }}
              />
            )}

            <Button type="submit" className="w-full">
              Reservasi Sekarang
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
