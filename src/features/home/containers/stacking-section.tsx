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
      gsap.set(nextSection, { y: "100vh", overwrite: true });

      ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(nextSection, {
            y: `${(1 - self.progress) * 100}vh`,
            ease: "power1.out",
            overwrite: "auto",
          });
        },
      });
    });

    // Gunakan batch untuk animasi elemen content dan button
    ScrollTrigger.batch(".content", {
      start: "top 80%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        }),
    });

    ScrollTrigger.batch(".button", {
      start: "top 85%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        }),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={sectionsRef} className="relative h-screen">
        {[StackingImageOne, StackingImageTwo, StackingImageThree].map(
          (image, index) => (
            <section
              key={index}
              className="section h-screen w-full flex items-center justify-center absolute top-0 left-0 z-10"
            >
              <Image
                alt=""
                src={image}
                className="w-screen h-screen object-cover"
              />
              <div
                className="absolute inset-0 container text-white py-10 md:py-16 h-full flex flex-col w-full 
                justify-center md:justify-between items-center md:items-start text-center md:text-left"
              >
                <h2 className="text-h6 md:text-h1">0{index + 1}/03</h2>
                <div className="flex flex-col gap-4 xl:flex-row justify-between w-full xl:items-end">
                  <div className="content flex flex-col gap-6 max-w-lg opacity-0 translate-y-10">
                    <h6 className="text-body-lg md:text-h6">
                      {index === 0
                        ? "PRIVATE RECOVERY"
                        : index === 1
                        ? "PRIVATE GYM"
                        : "PILATES - YOGA"}
                    </h6>
                    <h1 className="text-h1 md:text-display-sm">
                      {index === 0
                        ? "Revitalize with sauna, ice bath, and compression therapy to boost endurance and deep relaxation."
                        : index === 1
                        ? "Train with full focus in a private space with no waiting, no distractions just your goals."
                        : "Find harmony through movement with classes that improve mobility, flexibility, and inner balance."}
                    </h1>
                  </div>
                  <Link
                    href={`${
                      index === 0
                        ? "/service/recovery"
                        : index === 1
                        ? "/service/gym"
                        : "/sercvice/yoga"
                    }`}
                  >
                    <Button className="button mt-6 md:mt-0 opacity-0 scale-75">
                      Reservation
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          )
        )}
      </div>
      <div className="h-[300vh]"></div>
    </div>
  );
}
