"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { decodeJwt } from "@/lib/decode";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("Login successful.");
        router.push("/service/gym");
      } else {
        throw response?.error || "Authentication failed";
      }
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (session?.data?.user) {
      if (session.data.user.access_token) {
        const decoded = decodeJwt(session.data.user.access_token);
        if (decoded?.role !== "user") {
          router.push("/admin");
        } else {
          router.push("/service/gym");
        }
      }
    }
  }, [session]);

  return (
    <div className="flex bg-white rounded-2xl px-4 md:px-10 py-10 md:py-20 flex-col justify-center space-y-6 min-w-72 sm:min-w-88 md:min-w-[440px] xl:min-w-[480px] 2xl:min-w-[520px] w-full xl:w-fit my-16 md:my-0 z-20">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-h4 md:text-h1 font-medium text-black">
          Login Account
        </h1>
        <p className="text-body-sm md:text-body-lg text-light-100 font-normal">
          Enter your details below to login
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      <div className="flex gap-4 items-center">
        <hr className="w-full h-0.5 bg-light-100" />
        <span className="text-xs text-light-100">Or</span>
        <hr className="w-full h-0.5 bg-light-100" />
      </div>
      {/* <Button variant="light" size="default" className="w-full">
          <Image
            alt="google"
            src={GoogleIcon || "/placeholder.svg"}
            width={24}
            height={24}
          />
          Continue with Google
        </Button> */}
      <p className="px-8 text-center text-sm text-light-100 font-normal">
        Not registered yet?{" "}
        <Link href="/auth/register" className="text-primary-60 font-semibold">
          Create an Account
        </Link>
      </p>
    </div>
  );
}
