"use client";

import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import HomeBackground from "@/assets/images/hero-bg.png";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLImageElement | null>(null);
  const headingMobileRef = useRef<HTMLHeadingElement | null>(null);
  const headingDesktopRef = useRef<HTMLHeadingElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const prevWidthCategory = useRef<"mobile" | "desktop" | null>(null);

  const splitTextIntoSpans = (text: string) => {
    return text.split(" ").map((word: string, i: number) => (
      <span key={i} className="inline-block opacity-0">
        {word}&nbsp;
      </span>
    ));
  };

  const headingText =
    "Elevate Your Wellness with a Private Fitness & Recovery Experience";
  const desktopHeadingLines = [
    "Elevate Your Wellness",
    "with a Private Fitness &",
    "Recovery Experience",
  ];

  const animateTextMobile = (element: HTMLElement) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const wordSpans = element.querySelectorAll("span");
    tl.fromTo(
      wordSpans,
      { y: 50, opacity: 0, rotateX: 90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.05 }
    );
  };

  const animateTextDesktop = (element: HTMLElement) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    const wordSpans = element.querySelectorAll("span");
    tl.fromTo(
      wordSpans,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, stagger: 0.07 }
    );
  };

  const runAnimation = () => {
    if (!imageLoaded) return;

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        filter: "blur(0px)",
        duration: 1.5,
      });
    }

    if (windowWidth < 1280 && headingMobileRef.current) {
      animateTextMobile(headingMobileRef.current);
    } else if (windowWidth >= 1280 && headingDesktopRef.current) {
      animateTextDesktop(headingDesktopRef.current);
    }
  };

  useLayoutEffect(() => {
    runAnimation();
  }, [imageLoaded]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentWidthCategory = windowWidth < 1280 ? "mobile" : "desktop";

    if (prevWidthCategory.current !== currentWidthCategory) {
      runAnimation();
      prevWidthCategory.current = currentWidthCategory;
    }
  }, [windowWidth]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen h-screen relative flex justify-center items-center w-full"
    >
      <Image
        ref={bgRef}
        src={HomeBackground || "/placeholder.svg"}
        alt="Fitness background"
        className="absolute w-full h-full object-cover z-10 filter blur-md transition-all duration-1500"
        priority
        fill
        onLoadingComplete={() => setImageLoaded(true)}
      />
      <h1
        ref={headingMobileRef}
        className="container w-full xl:hidden text-display-sm text-center md:text-display-xxl z-20 text-white"
      >
        {splitTextIntoSpans(headingText)}
      </h1>
      <div className="hidden xl:block container relative -bottom-[10vh] 2xl:-bottom-[20vh]">
        <h1
          ref={headingDesktopRef}
          className="hidden xl:block absolute text-display-xs xl:text-display-lg text-center md:text-start md:text-display-xxl z-20 text-white max-w-3xl"
        >
          {desktopHeadingLines.map((line, i) => (
            <React.Fragment key={i}>
              {splitTextIntoSpans(line)}
              {i < desktopHeadingLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
      </div>
    </section>
  );
}
