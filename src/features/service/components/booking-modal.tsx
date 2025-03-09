"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const bookingFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingDialogProps {
  user?: User;
  open: boolean;
  selectedSlot: string | null;
  onClose: () => void;
  onConfirm: (name: string, notes: string) => void;
}

export default function BookingModal({
  open,
  selectedSlot,
  onClose,
  onConfirm,
  user,
}: BookingDialogProps) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone_number: user?.phone_number ?? "",
      // start_date: "",
      // end_date: ""
    },
  });
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user, form]);
  const [isLoading, setIsLoading] = useState(false);

  if (!selectedSlot) return null;

  // Parse the ISO string to display a readable date and time
  const date = new Date(selectedSlot);
  const formattedDate = format(date, "EEEE, MMMM d, yyyy");
  const formattedTime = format(date, "h:mm a");

  const onSubmit = (values: BookingFormValues) => {};

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-transparent border-secondary-60 sm:max-w-md p-10">
        <DialogHeader className="text-center gap-2">
          <DialogTitle className="text-center text-light-20 text-h4 md:text-h1">
            Form Reservation
          </DialogTitle>
          <DialogDescription className="text-center text-light-100 text-body-lg">
            Complete the form below to book your gym session.
          </DialogDescription>
        </DialogHeader>

        {/* <div className="mb-4">
          <p className="text-gray-300">Selected time:</p>
          <p className="font-semibold">{formattedDate}</p>
          <p className="font-semibold">{formattedTime}</p>
          <p className="text-xs text-gray-400 mt-1 font-mono">{selectedSlot}</p>
        </div> */}

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
                      className={`absolute left-3 top-1 text-xs ${
                        hasError ? "text-danger-80" : "text-[#5C5A5A]"
                      }`}
                    >
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        className={`pt-6 ${
                          hasError ? "border-danger-80 " : ""
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="absolute right-3 top-0.5 text-danger-80 text-xs" />
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
                      className={`absolute left-3 top-1 text-xs ${
                        hasError ? "text-danger-80" : "text-[#5C5A5A]"
                      }`}
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className={`pt-6 ${
                          hasError ? "border-danger-80 " : ""
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="absolute right-3 top-0.5 text-danger-80 text-xs" />
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
                      className={`absolute left-3 top-1 text-xs ${
                        hasError ? "text-danger-80" : "text-[#5C5A5A]"
                      }`}
                    >
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+62XXXXXXXXXX"
                        {...field}
                        className={`pt-6 ${
                          hasError ? "border-danger-80 " : ""
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="absolute right-3 top-0.5 text-danger-80 text-xs" />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
