import React from "react";
import HeroService from "../components/hero";
import HeroRecoveryImage from "@/assets/images/hero-recovery.jpg";
import ServiceOffer from "../components/offer";
import ScheduleContainer from "./schedule-container";
import { recoverySubservices } from "../data/subservice";
import FAQContainer from "./faq-container";
import { recoveryFAQ } from "../data/faq";

export default async function RecoveryContainer() {
  return (
    <>
      <HeroService
        subtitle="Recharge, Recover, and Rejuvenate"
        title="RECOVERY ROOM"
        image={HeroRecoveryImage}
        description="Your body deserves the best recovery. Our private recovery space offers a selection of scientifically backed therapies to enhance endurance, reduce muscle fatigue, and promote deep relaxation—all in a completely private environment."
      />
      <ServiceOffer subservices={recoverySubservices} />
      <ScheduleContainer type="recovery" />
      <FAQContainer faqs={recoveryFAQ} />
    </>
  );
}
