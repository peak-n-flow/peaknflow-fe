import React from "react";
import HeroService from "../components/hero";
import HeroGymImage from "@/assets/images/hero-gym.jpg";
import ServiceOffer from "../components/offer";
import ScheduleContainer from "./schedule-container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { GET } from "@/app/api/auth/me/route";
export default async function GymContainer() {
  const subservices = [
    {
      title: "Premium Equipment",
      description: "Toptier fitness machines and free weights.",
    },
    {
      title: "Distraction Free Zone",
      description: "No crowds, no interruptions, just your training.",
    },
    {
      title: "Customizable Environment",
      description: "Control the music, lighting, and ambiance.",
    },
  ];
  //   const session = await GET;
  return (
    <>
      <HeroService
        subtitle="Train with Focus, Train for Resultse"
        title="PRIVATE GYM"
        image={HeroGymImage}
        description="No waiting and no distractions. This is your time to focus entirely on your personal fitness journey in a private gym space designed for maximum efficiency and comfort. Enjoy a fully equipped environment where you can train at your own pace."
      />
      <ServiceOffer subservices={subservices} />
      <ScheduleContainer />

      {/* <p>{JSON.stringify(session)}</p> */}
    </>
  );
}
