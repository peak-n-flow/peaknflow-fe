"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { EventRequest } from "../../types";
import { createEvent, updateEvent } from "../../services/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Update the form schema to handle price as a number
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.string().regex(/^\d+%?$/, {
    message: "Price must be a number with optional % symbol.",
  }),
  quota: z.string().regex(/^\d+$/, {
    message: "Quota must be a number.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
  startTime: z.string({
    required_error: "Start time is required.",
  }),
  endTime: z.string({
    required_error: "End time is required.",
  }),
});

export default function EventForm({
  id,
  event,
}: {
  id: string;
  event?: Event;
}) {
  const router = useRouter();
  const toLocalDate = (utcString?: string) =>
    utcString ? new Date(utcString) : undefined;

  const toLocalTime = (utcString?: string) => {
    if (!utcString) return "";
    const date = new Date(utcString);
    return date.toTimeString().substring(0, 5); // Format "HH:MM"
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event?.name || "",
      price: event?.price.toString() || "",
      quota: event?.slot?.toString() || "",
      startDate: toLocalDate(event?.start_date),
      endDate: toLocalDate(event?.end_date),
      startTime: toLocalTime(event?.start_time),
      endTime: toLocalTime(event?.end_time),
    },
  });

  // Replace the onSubmit function with this updated version
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Get user's timezone offset in the format +HH:MM or -HH:MM
    const getTimezoneOffset = () => {
      const date = new Date();
      const offset = -date.getTimezoneOffset(); // Negative because getTimezoneOffset returns opposite sign
      const hours = Math.abs(Math.floor(offset / 60))
        .toString()
        .padStart(2, "0");
      const minutes = Math.abs(offset % 60)
        .toString()
        .padStart(2, "0");
      return `${offset >= 0 ? "+" : "-"}${hours}:${minutes}`;
    };

    const timezoneOffset = getTimezoneOffset();

    // Format date with timezone
    const formatDateWithTimezone = (date: Date, timeString: string) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);

      // Format to RFC3339 with timezone
      const year = newDate.getFullYear();
      const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
      const day = newDate.getDate().toString().padStart(2, "0");
      const hour = hours.toString().padStart(2, "0");
      const minute = minutes.toString().padStart(2, "0");

      return `${year}-${month}-${day}T${hour}:${minute}:00${timezoneOffset}`;
    };

    // Format date with zero time
    const formatDateWithZeroTime = (date: Date) => {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);

      // Format to RFC3339 with timezone
      const year = newDate.getFullYear();
      const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
      const day = newDate.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}T00:00:00${timezoneOffset}`;
    };

    // Parse price to remove % if present and convert to number
    const priceValue = Number.parseInt(values.price.replace("%", ""));

    // Create the request payload
    const requestPayload: EventRequest = {
      name: values.name,
      price: priceValue,
      slot: Number.parseInt(values.quota),
      start_time: formatDateWithTimezone(values.startDate, values.startTime),
      end_time: formatDateWithTimezone(values.startDate, values.endTime), // Ensure the date is the same as startDate
      start_date: formatDateWithZeroTime(values.startDate),
      end_date: formatDateWithZeroTime(values.endDate),
      is_event: false,
    };

    if (event?.id) {
      try {
        await updateEvent(requestPayload, id, event.id);
        toast.success("Event created successfully");
        router.push(`/admin/service/${id}/events`);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to create event"
        );
      }
    } else {
      try {
        await createEvent(requestPayload, id);
        toast.success("Event created successfully");
        router.push(`/admin/service/${id}/events`);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to create event"
        );
      }
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Service Detail</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input id="name" placeholder="Yoga Ashtanga" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input id="price" placeholder="20%" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quota">Quota</Label>
              <FormField
                control={form.control}
                name="quota"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input id="quota" placeholder="120" {...field} />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                          Ppl
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, hour) =>
                            [0, 30].map((minute) => {
                              const timeValue = `${hour
                                .toString()
                                .padStart(2, "0")}:${minute
                                .toString()
                                .padStart(2, "0")}`;
                              const displayTime = `${hour % 12 || 12}:${minute
                                .toString()
                                .padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
                              return (
                                <SelectItem key={timeValue} value={timeValue}>
                                  {displayTime}
                                </SelectItem>
                              );
                            })
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, hour) =>
                            [0, 30].map((minute) => {
                              const timeValue = `${hour
                                .toString()
                                .padStart(2, "0")}:${minute
                                .toString()
                                .padStart(2, "0")}`;
                              const displayTime = `${hour % 12 || 12}:${minute
                                .toString()
                                .padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
                              return (
                                <SelectItem key={timeValue} value={timeValue}>
                                  {displayTime}
                                </SelectItem>
                              );
                            })
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1">
                Kembali
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-black text-white hover:bg-gray-800"
              >
                {event?.id ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
