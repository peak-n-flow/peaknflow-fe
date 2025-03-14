import React from "react";
import HeroService from "../components/hero";
import HeroGymImage from "@/assets/images/hero-gym.jpg";
import ServiceOffer from "../components/offer";
import ScheduleContainer from "./schedule-container";
import { gymSubservices } from "../data/subservice";

export default async function GymContainer() {
  return (
    <>
      <HeroService
        subtitle="Train with Focus, Train for Resultse"
        title="PRIVATE GYM"
        image={HeroGymImage}
        description="No waiting and no distractions. This is your time to focus entirely on your personal fitness journey in a private gym space designed for maximum efficiency and comfort. Enjoy a fully equipped environment where you can train at your own pace."
      />
      <ServiceOffer subservices={gymSubservices} />
      <ScheduleContainer type="gym" />
    </>
  );
}
