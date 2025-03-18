"use client";

import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function HeroService({
  title,
  subtitle,
  description,
  image,
}: {
  title: string;
  subtitle: string;
  description: string;
  image: StaticImport;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const playAnimation = () => {
    gsap.set(
      [
        titleRef.current,
        subtitleRef.current,
        descriptionRef.current,
        imageRef.current,
      ],
      {
        clearProps: "all",
      }
    );

    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        descriptionRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        imageRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      );

    return tl;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf([
      titleRef.current,
      subtitleRef.current,
      descriptionRef.current,
      imageRef.current,
    ]);

    const tl = playAnimation();

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return (
    <section
      ref={sectionRef}
      className="container flex flex-col gap-10 md:gap-20 mt-20 md:mt-20 pt-16 md:pt-20 pb-10 md:pb-20 md:min-h-screen w-full"
    >
      <div className="flex w-full justify-between flex-col xl:flex-row gap-6">
        <div className="flex flex-col gap-2 text-h6 text-center xl:text-start">
          <h2 ref={titleRef}>{title}</h2>
          <h3 ref={subtitleRef} className="hidden xl:block">
            {subtitle}
          </h3>
        </div>
        <h1
          ref={descriptionRef}
          className="text-h4 md:text-display-xs max-w-4xl text-center xl:text-start"
        >
          {description}
        </h1>
      </div>
      <div ref={imageRef} className="w-full">
        <Image
          src={image}
          alt={title}
          className="w-full h-[250px] md:h-[600px] rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
