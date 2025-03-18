import RecoveryContainer from "@/features/service/containers/recovery-container";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Recovery Room",
  description:
    "Rasakan pemulihan terbaik dengan layanan Ruang Pemulihan kami, yang menampilkan sesi sauna, icebath, compression booth, massage gun, dan ruang tenang untuk menyegarkan pernapasan.",
};

export default function RecoveryRoomPage() {
  return <RecoveryContainer />;
}
