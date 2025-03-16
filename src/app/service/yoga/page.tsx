import YogaContainer from "@/features/service/containers/yoga-container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Yoga Studio",
  description:
    "Temukan manfaat dari Studio Yoga kami dengan berbagai fasilitas termasuk Yoga Reguler, Aerial Yoga, dan Pilates. Rasakan ketenangan dan penyegaran dengan fasilitas lengkap dan peralatan berkualitas yang dirancang untuk meningkatkan kesejahteraan fisik dan mental Anda.",
};

export default function YogaStudioPage() {
  return <YogaContainer />;
}
