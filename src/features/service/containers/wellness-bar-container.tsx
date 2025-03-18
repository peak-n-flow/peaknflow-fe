import React from "react";
import HeroService from "../components/hero";
import ServiceOffer from "../components/offer";
import WellnessBarImage from "@/assets/images/hero-bar.jpg";
import { wellnessBarSubservices } from "../data/subservice";
import FAQContainer from "./faq-container";
import { wellnessBarFAQ } from "../data/faq";
export default function WellnessBarContainer() {
  return (
    <>
      <HeroService
        subtitle="Fuel Your Body, Elevate Your Energy"
        title="Wellness Bar – "
        image={WellnessBarImage}
        description="From cold-pressed juices to specialty coffee, matcha, and refreshing energy boosters, our Wellness Bar is the perfect stop for anyone looking to refuel and recharge. Whether you're grabbing a post-workout drink, a midday pick-me-up, or a chill refresher to sip and relax."
      />
      <ServiceOffer subservices={wellnessBarSubservices} />
      <FAQContainer faqs={wellnessBarFAQ} />
    </>
  );
}
