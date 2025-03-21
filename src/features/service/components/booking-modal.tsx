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
import { formatJakartaTime, localToUTC } from "@/lib/date";
import { getId } from "@/lib/get-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TransactionRequest } from "../types";

const bookingFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  hour: z.number().min(1, { message: "Hour must be at least 1." }),
  payment_method: z
    .string()
    .nonempty({ message: "Please select a payment method." }),
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
}

export default function BookingModal({
  open,
  selectedSlot,
  onClose,
  onConfirm,
  user,
  serviceType,
  maxBookHour,
}: BookingDialogProps) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone_number: user?.phone_number ?? "",
      hour: 1,
      payment_method: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? "",
        email: user.email ?? "",
        phone_number: user.phone_number ?? "",
        hour: 1,
        payment_method: "",
      });
    }
  }, [user, form]);

  if (!selectedSlot) return null;

  const formattedDate = formatJakartaTime(selectedSlot, "EEEE, MMMM d, yyyy");
  const formattedTime = formatJakartaTime(selectedSlot, "h:mm a");
  const date = new Date(selectedSlot);

  const onSubmit = async (values: BookingFormValues) => {
    const transactionRequest: TransactionRequest = {
      service_id: getId(serviceType) ?? "",
      start_at: new Date(selectedSlot).toISOString().replace(/\.\d{3}Z$/, "Z"),
      end_at: localToUTC(
        new Date(date.getTime() + values.hour * 60 * 60 * 1000)
      ),
      payment_method: values.payment_method,
      user_name: values.name,
      user_email: values.email,
      user_phone_number: values.phone_number,
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
                  <FormItem className="relative pb-2">
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
                  <FormItem className="relative pb-2">
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
            <FormField
              control={form.control}
              name="hour"
              render={({ field }) => {
                const hasError = !!form.formState.errors.hour;
                return (
                  <FormItem className="relative pb-2">
                    <FormLabel
                      className={`text-white absolute left-3 top-1 text-xs h-12 ${
                        hasError ? "text-danger-40" : "text-white"
                      }`}
                    >
                      Booking Hours (Max {maxBookHour} hours)
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value.toString()}
                      >
                        <SelectTrigger
                          className={`pt-6 ${
                            hasError
                              ? "border-danger-40 bg-transparent"
                              : "bg-transparent border border-secondary-60"
                          }`}
                        >
                          <SelectValue placeholder="Select booking hours" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: maxBookHour }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1} hour{i + 1 > 1 ? "s" : ""}
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
            <Button type="submit" className="w-full">
              Reservasi Sekarang
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
