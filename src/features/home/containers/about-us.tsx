"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import PillatesImage from "@/assets/images/about-us-pillates.jpg";
import AboutUsImage from "@/assets/images/about-us2.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutUs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const serviceTagRef = useRef(null);
  const serviceHeadingRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, paragraphRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set([image1Ref.current, image2Ref.current], {
        opacity: 0,
        scale: 0.9,
        y: 30,
      });

      gsap.set([serviceTagRef.current, serviceHeadingRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      gsap.to(paragraphRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 80%",
        },
      });

      gsap.to(image1Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image1Ref.current,
          start: "top 85%",
        },
      });

      gsap.to(image2Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image2Ref.current,
          start: "top 85%",
        },
      });

      gsap.to(serviceTagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: serviceTagRef.current,
          start: "top 80%",
        },
      });

      gsap.to(serviceHeadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: serviceHeadingRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="container min-h-screen py-10 md:py-20 flex flex-col gap-10 md:gap-20"
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <h2 ref={headingRef} className="">
          ABOUT US
        </h2>
        <p ref={paragraphRef} className="text-h1 md:text-display-sm">
          Wellness is more than just exercise. It is about balance, recovery,
          and feeling your best. We provide a truly private fitness and recovery
          experience designed to help you move, restore, and perform at your
          peak free from distractions
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div ref={image1Ref} className="overflow-hidden rounded-xl">
          <Image
            src={PillatesImage || "/placeholder.svg"}
            alt="Pillates training session"
            className="rounded-xl w-full h-auto transform transition-transform hover:scale-105 duration-700"
          />
        </div>
        <div ref={image2Ref} className="overflow-hidden rounded-xl self-end">
          <Image
            src={AboutUsImage || "/placeholder.svg"}
            alt="Wellness center"
            className="rounded-xl w-full h-auto transform transition-transform hover:scale-105 duration-700"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-10 text-center">
        <span ref={serviceTagRef} className="text-h6">
          OUR SERVICE
        </span>
        <h2
          ref={serviceHeadingRef}
          className="text-h3 md:text-display-sm max-w-screen-xl"
        >
          Experience Private Recovery, Exclusive Training, and Mindful Movement
          for Your Optimal Well-being
        </h2>
      </div>
    </section>
  );
}
