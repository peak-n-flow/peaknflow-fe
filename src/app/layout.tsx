import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import MainProvider from "@/components/provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peak & Flow | Private Fitness & Recovery",
  description:
    "Peak & Flow menghadirkan pengalaman fitness dan recovery premium dengan ruang privat untuk kenyamanan maksimal.",
  keywords:
    "peak & flow, gym, fitness, recovery, private gym, wellness bar, malang, gym malang, yoga malang, private gym malang,",
  authors: [{ name: "Peak & Flow", url: "https://peakandflow.com" }],
  openGraph: {
    title: "Peak & Flow | Private Gym, Recovery, and Yoga in Malang",
    description:
      "Private Gym, Recovery, and Yoga pertama dan terbaik di Kota Malang. Jalan Cengger Ayam, Tulusrejo, Kec. Lowokwaru, Kota Malang, Jawa Timur",
    url: "https://peakandflow.com",
    siteName: "Peak & Flow",
    images: [
      {
        url: "/peaknflow-twitter.png",
        width: 1200,
        height: 630,
        alt: "Peak & Flow",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peak & Flow | Private Fitness & Recovery",
    description:
      "Elevate your recovery & fitness in a private space with Peak & Flow.",
    images: ["/peaknflow-twitter.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/logo-nav.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/logo-nav.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-nav.png" /> */}
        <meta name="robots" content="index, follow" />
      </head>

      <body className={`antialiased bg-secondary-80 text-white`}>
        <MainProvider>
          <Navbar />
          {children}
          <Footer />
        </MainProvider>
      </body>
    </html>
  );
}
