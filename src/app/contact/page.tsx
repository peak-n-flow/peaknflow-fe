import ContactForm from "@/features/contact/container/form-email";
import React from "react";

export default function ContactPage() {
  return (
    <main className="min-h-screen py-[20vh] container flex flex-col xl:flex-row gap-16 justify-between ">
      <div className="flex flex-col gap-10 md:gap-20">
        <div className="flex flex-col">
          <h1 className="text-h1 md:text-display-md xl:text-display-xxl">
            Get In
          </h1>
          <h1 className="text-h1 md:text-display-md xl:text-display-xxl pl-16 italic">
            Touch
          </h1>
        </div>
        <ContactForm />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-lg gap-10 xl:gap-y-52">
        <div className="flex flex-col gap-8">
          <h3 className="text-h6">OUR SOCIAL</h3>
          <div className="flex flex-col gap-6 text-h1 md:text-display-sm">
            <span>Instagram</span>
            <span>Tiktok</span>
            <span>Youtube</span>
          </div>
        </div>
        <div className="flex flex-col gap-10 md:gap-20">
          <div className="flex flex-col gap-8">
            <h3 className="text-h6">MONDAY-SUNDAY, 08:00-17.00</h3>
            <span className="text-h1 md:text-display-sm">P&Flow@gmail.com</span>
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="text-h6">We respond within a few hours</h3>
            <span className="text-h1 md:text-display-sm">+6282131938580</span>
          </div>
        </div>
        <span className="max-w-96">
          Jl. Cengger Ayam, Tulusrejo, Kec. Lowokwaru, Kota Malang, Jawa Timur
        </span>
      </div>
    </main>
  );
}
