import HeroYogaStudio from "@/assets/images/hero-yoga.jpg";
import HeroService from "../components/hero";
import ServiceOffer from "../components/offer";
import { yogaSubservices } from "../data/subservice";
import ScheduleContainer from "./schedule-container";

export default async function YogaContainer() {
  return (
    <>
      <HeroService
        subtitle="Move, Breathe, and Find Your Balance"
        title="YOGA STUDIO"
        image={HeroYogaStudio}
        description="Wellness is not just about working out. It is about connecting your body and mind. Our private yoga and Pilates studio enhances mobility, improves flexibility, and promotes mindfulness in a peaceful and intimate space. Focus on your movements, breathe deeply, and restore balance without distractions."
      />
      <ServiceOffer subservices={yogaSubservices} />
      <ScheduleContainer type="yoga" />
    </>
  );
}
