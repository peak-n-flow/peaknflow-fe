"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepProps {
  number: string;
  title: string;
}

const Step = ({ number, title }: StepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={stepRef}
      className="flex flex-col h-full gap-10 md:gap-20 border border-secondary-60 p-6 md:p-8 opacity-0"
    >
      <span className="italic text-4xl md:text-6xl lg:text-7xl font-light text-light-80 mb-4">
        {number}
      </span>
      <h2 className="text-lg md:text-xl lg:text-2xl font-light">{title}</h2>
    </div>
  );
};

export default function HowToReservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { backgroundColor: "#000000" },
      {
        backgroundColor: "#1E1E1E",
        duration: 1.5,
        ease: "power2.inOut",
      }
    );

    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      }
    );

    const stepsContainer = stepsContainerRef.current;
    if (stepsContainer) {
      const steps = stepsContainer.querySelectorAll("div > div");

      gsap.fromTo(
        steps,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsContainer,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const steps = [
    {
      number: "01",
      title:
        "Choose Your Experience and Unlock a Personalized Wellness Journey",
    },
    {
      number: "02",
      title: "Select Your Preferred Date and Time for a Seamless Booking",
    },
    {
      number: "03",
      title:
        "Fill in Your Details to Secure Your Exclusive Access and Get Started",
    },
    {
      number: "04",
      title: "Complete Your Payment and Instantly Confirm Your Reservation",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#1E1E1E] text-white py-16 md:py-24"
    >
      <div className="container mx-auto grid grid-cols-1 2xl:grid-cols-[1fr,1fr] gap-10 lg:gap-16">
        <div className="flex flex-col gap-6 md:gap-8">
          <span className="text-sm md:text-base uppercase tracking-wide text-white opacity-0 animate-fadeIn">
            HOW TO RESERVATIONS
          </span>
          <h1
            ref={headingRef}
            className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight"
          >
            Reserve your private space effortlessly in just a few clicks and
            enjoy a seamless fitness and recovery experience without
            distractions
          </h1>
        </div>

        <div
          ref={stepsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {steps.map((step, index) => (
            <Step key={step.number} number={step.number} title={step.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
