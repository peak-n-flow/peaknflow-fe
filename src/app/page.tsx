import AboutUs from "@/features/home/containers/about-us";
import Hero from "@/features/home/containers/hero";
import HowToReservation from "@/features/home/containers/reservation";
import StackingSection from "@/features/home/containers/stacking-section";

export default async function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <StackingSection />
      <HowToReservation />
    </>
  );
}
