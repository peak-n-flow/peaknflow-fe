"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { createService, updateService } from "../../services/client";
import type { ServiceRequest } from "../../types";
import { GYM_ID } from "@/lib/env";

// Define the Service type if it's not imported from elsewhere
interface Service {
  id?: string;
  name: string;
  price: number;
  slot: number;
  duration_in_minutes: number;
  description: string;
  gym_id: string;
}

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
  duration_in_minutes: z.string().regex(/^\d+$/, {
    message: "Duration must be a number.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export default function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: service?.name ?? "",
      price: service?.price?.toString() ?? "",
      quota: service?.slot?.toString() ?? "",
      duration_in_minutes: service?.duration_in_minutes?.toString() ?? "",
      description: service?.description ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Log form values for debugging
      console.log("Form values:", values);

      // Handle price with percentage symbol
      let priceValue = 0;
      if (values.price.includes("%")) {
        priceValue = Number.parseFloat(values.price.replace("%", ""));
      } else {
        priceValue = Number.parseInt(values.price);
      }

      // Check if GYM_ID is available
      if (!GYM_ID) {
        toast.error("Gym ID is not defined");
        return;
      }

      const requestPayload: ServiceRequest = {
        name: values.name,
        price: priceValue,
        slot: Number.parseInt(values.quota),
        duration_in_minutes: Number.parseInt(values.duration_in_minutes),
        gym_id: GYM_ID,
        description: values.description,
      };

      console.log("Request payload:", requestPayload);

      if (service?.id) {
        await updateService(requestPayload, service.id);
        toast.success("Service updated successfully");
        router.push("/admin/service");
      } else {
        await createService(requestPayload);
        toast.success("Service created successfully");
        router.push("/admin/service");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to process service"
      );
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
                      <Input id="name" placeholder="Nama Servis" {...field} />
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
                      <Input id="price" placeholder="50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_in_minutes">Duration in minutes</Label>
              <FormField
                control={form.control}
                name="duration_in_minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="duration_in_minutes"
                        placeholder="60"
                        {...field}
                      />
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

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="description"
                        placeholder="Service description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.push("/admin/service")}
              >
                Kembali
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-black text-white hover:bg-gray-800"
              >
                {service?.id ? "Update Service" : "Buat Service"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
