import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainProvider from "@/components/provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peak & Flow",
  description: "Elevate Your Recovery & Fitness in a Private Space",
  icons:"/logo.png",
};

export const headers = {
  "Cache-Control": "no-store, max-age=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary-80 text-white`}
      >
        <MainProvider>
          <Navbar />
          {children}
          <Footer />
        </MainProvider>
      </body>
    </html>
  );
}
