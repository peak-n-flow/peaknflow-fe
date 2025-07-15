import PilatesContainer from "@/features/service/containers/pilates-container";
import YogaContainer from "@/features/service/containers/yoga-container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pilates Studio",
  description:
    "Temukan manfaat dari Studio Pilates kami dengan berbagai fasilitas termasuk Pilates Reguler, Aerial Pilates, dan Yoga. Rasakan ketenangan dan penyegaran dengan fasilitas lengkap dan peralatan berkualitas yang dirancang untuk meningkatkan kesejahteraan fisik dan mental Anda.",
};

export default function PilatesStudioPage() {
  return <PilatesContainer />;
}
