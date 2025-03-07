"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import GoogleIcon from "@/assets/icons/google.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { getErrorMessage } from "@/lib/error";

const registerFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters." }),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);

    try {
      const formattedData = {
        ...data,
        phone_number: `+62${data.phone_number}`,
      };
      const response = await api.post("auth/register", formattedData);

      toast.success("Registration successful.");
      router.push("/auth/login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex bg-white rounded-2xl px-4 md:px-10 py-10 md:py-20 flex-col justify-center space-y-6 min-w-72 sm:min-w-88 md:min-w-[440px] xl:min-w-[480px] 2xl:min-w-[520px] w-full xl:w-fit my-16 md:my-0 z-20">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-h4 md:text-h1 font-medium">Create Account</h1>
        <p className="text-body-sm md:text-body-lg text-light-100">
          Enter your details below to create an account
        </p>
      </div>
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
                      className={`pt-6 ${hasError ? "border-danger-80 " : ""}`}
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
                      className={`pt-6 ${hasError ? "border-danger-80 " : ""}`}
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
                    <div
                      className={`flex items-center pt-6 border rounded-md ${
                        hasError ? "border-red-500" : ""
                      }`}
                    >
                      <span className="pl-3 text-gray-500">+62</span>
                      <Input
                        placeholder="Enter your phone number"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/\D/g, ""))
                        }
                        className="border-0 focus:ring-0 focus:border-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="absolute right-3 top-0.5 text-danger-80 text-xs" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const hasError = !!form.formState.errors.password;
              return (
                <FormItem className="relative">
                  <FormLabel
                    className={`absolute left-3 top-1 text-xs ${
                      hasError ? "text-danger-80" : "text-[#5C5A5A]"
                    }`}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      {...field}
                      className={`pt-6 ${hasError ? "border-danger-80 " : ""}`}
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
      <div className="flex gap-4 items-center">
        <hr className="w-full h-0.5 bg-light-100" />
        <span className="text-xs text-light-100">Or</span>
        <hr className="w-full h-0.5 bg-light-100" />
      </div>
      {/* <Button variant="light" size="default" className="w-full">
          <Image alt="google" src={GoogleIcon || "/placeholder.svg"} width={24} height={24} />
          Continue with Google
        </Button> */}
      <p className="px-8 text-center text-sm text-light-100">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary-60">
          Login
        </Link>
      </p>
    </div>
  );
}
