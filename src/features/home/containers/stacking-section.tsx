"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import StackingImageOne from "@/assets/images/stacking-section1.jpg";
import StackingImageTwo from "@/assets/images/stacking-section2.jpg";
import StackingImageThree from "@/assets/images/stacking-section3.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StackingSection() {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionsRef.current || !containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: sectionsRef.current,
      pinSpacing: false,
    });

    const sections = gsap.utils.toArray<HTMLElement>(".section");

    sections.forEach((section, i) => {
      if (i === sections.length - 1) return;

      const nextSection = sections[i + 1];

      gsap.set(nextSection, { y: "100vh" });

      ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 1000,
        onUpdate: (self) => {
          gsap.to(nextSection, {
            y: `${(1 - self.progress) * 100}vh`,
            ease: "power1.out",
            overwrite: "auto",
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={sectionsRef} className="relative h-screen">
        <section className="section h-screen w-full flex items-center justify-center absolute top-0 left-0 z-10">
          <Image alt="" src={StackingImageOne} className="w-screen h-screen" />
          <div className="absolute inset-0 container text-white py-10 md:py-16 h-full flex flex-col w-full justify-between">
            <h2 className="text-h6 md:text-h1">01/03</h2>
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-8 ">
                <h6 className="text-h6">PRIVATE RECOVERY</h6>
                <h1 className="text-display-sm">
                  Revitalize with sauna, ice bath,
                  <br /> and compression therapy to boost <br />
                  endurance and deep relaxation.
                </h1>
              </div>
              <Link href={"/booking"}>
                <Button>Reservation</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="section h-screen w-full flex items-center justify-center absolute top-0 left-0 z-10">
          <Image alt="" src={StackingImageTwo} className="w-screen h-screen" />
          <div className="absolute inset-0 container text-white py-10 md:py-16 h-full flex flex-col w-full justify-between">
            <h2 className="text-h6 md:text-h1">02/03</h2>
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-8 ">
                <h6 className="text-h6">PRIVATE GYM</h6>
                <h1 className="text-display-sm">
                  Train with full focus in a private <br />
                  space with no waiting
                  <br /> no distractions just your goals
                </h1>
              </div>
              <Link href={"/booking"}>
                <Button>Reservation</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="section h-screen w-full flex items-center justify-center absolute top-0 left-0 z-10">
          <Image
            alt=""
            src={StackingImageThree}
            className="w-screen h-screen"
          />
          <div className="absolute inset-0 container text-white py-10 md:py-16 h-full flex flex-col w-full justify-between">
            <h2 className="text-h6 md:text-h1">03/03</h2>
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-8 ">
                <h6 className="text-h6">PILATES - YOGA</h6>
                <h1 className="text-display-sm">
                  Find harmony through movement <br />
                  with classes that improve mobility,
                  <br /> flexibility, and inner balance
                </h1>
              </div>
              <Link href={"/booking"}>
                <Button>Reservation</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="h-[300vh]"></div>
    </div>
  );
}
