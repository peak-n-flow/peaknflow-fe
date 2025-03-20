"use client";
import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { disableNavbarFooter } from "@/lib/disable";
import { usePathname } from "next/navigation";
const formSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
});

export default function Footer() {
  const pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: any) {}

  return (
    !disableNavbarFooter.includes(pathname) &&
    !pathname.includes("/admin") && (
      <footer className="bg-secondary-60 py-10 md:py-20 flex flex-col gap-5 md:gap-10 font-light">
        <section className="container flex flex-col xl:flex-row w-full justify-between items-start">
          <Image
            src={"/logo-nav.png"}
            alt="logo"
            className="invert brightness-0"
            width={60}
            height={40}
          />
          <div className="flex flex-col max-w-2xl gap-5 md:gap-10">
            <p className="text-h4 md:text-display-sm text-white">
              We design spaces for movement, recovery, and balance. Stay
              connected and subscribe for wellness tips, special offers, and
              exclusive early access to promotions.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-2 items-center w-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    const hasError = !!form.formState.errors.email;
                    return (
                      <FormItem className="relative flex-grow w-full">
                        {/* <FormLabel
                        className={`absolute left-3 top-1 text-xs ${
                          hasError ? "text-danger-80" : "text-[#5C5A5A]"
                        }`}
                      >
                        Email
                      </FormLabel> */}
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                            className={`w-full ${
                              hasError ? "border-danger-80 " : ""
                            }`}
                          />
                        </FormControl>
                        <FormMessage className="absolute right-3 top-0.5 text-danger-80 text-xs" />
                      </FormItem>
                    );
                  }}
                />
                <Button type="submit" className="w-1/5 min-w-[100px]">
                  Berlangganan
                </Button>
              </form>
            </Form>
          </div>
        </section>
        <section className="container flex flex-col gap-5 md:gap-10 text-white">
          <div className="max-w-xl grid grid-cols-3 text-white text-body-lg md:text-h5">
            <Link className="font-light" href={"/"}>
              Home
            </Link>
            <span className="font-light">Instagram</span>
            <span className="font-light">P&Flow@gmail.com</span>
            <Link className="font-light" href={"/service"}>
              Service
            </Link>
            <span className="font-light">Tiktok</span>
            <span className="font-light">+6282131938580</span>
            <Link className="font-light" href={"/contact"}>
              Contact
            </Link>
            <span className="font-light">Youtube</span>
          </div>
          <hr className="h-[1px] w-full bg-secondary-40" />
          <div className="flex justify-between w-full">
            <span>© Peak&Flow. All Right Reserved</span>
            <div className="flex items-center gap-2">
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
              <Link href={"/terms-condition"}>Terms & Condition</Link>
            </div>
          </div>
        </section>
      </footer>
    )
  );
}
