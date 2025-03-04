"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
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
        router.push("/booking");
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

  return (
    <div className="flex bg-white rounded-2xl px-4 md:px-10 py-10 md:py-20 flex-col justify-center space-y-6 min-w-72 sm:min-w-88 md:min-w-[440px] xl:min-w-[480px] 2xl:min-w-[520px] w-full xl:w-fit my-16 md:my-0 z-20">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-h1 font-medium">Login Account</h1>
        <p className="text-body-lg text-light-100">
          Enter your details below to login
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
      <p className="px-8 text-center text-sm text-light-100">
        Not registered yet?{" "}
        <Link href="/auth/register" className="text-primary-60">
          Create an Account
        </Link>
      </p>
    </div>
  );
}
