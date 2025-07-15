"use client";

import { useEffect, useRef } from "react";
import type { SubService } from "../types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServiceOffer({
  subservices,
}: {
  subservices: SubService[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const descriptionsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current = cardsRef.current.slice(0, subservices.length);
    titlesRef.current = titlesRef.current.slice(0, subservices.length);
    descriptionsRef.current = descriptionsRef.current.slice(
      0,
      subservices.length
    );

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const cards = cardsRef.current.filter(Boolean);
    const titles = titlesRef.current.filter(Boolean);
    const descriptions = descriptionsRef.current.filter(Boolean);

    gsap.set(cards, {
      opacity: 0,
      rotationY: -15,
      transformPerspective: 1000,
      transformOrigin: "left center",
    });

    gsap.set(titles, {
      opacity: 0,
      y: 30,
      transformOrigin: "bottom center",
    });

    gsap.set(descriptions, {
      opacity: 0,
      y: 20,
      scale: 0.9,
    });

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reset",
      },
    });

    cards.forEach((card, index) => {
      const cardTl = gsap.timeline();

      cardTl
        .to(card, {
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out",
        })

        .to(
          titlesRef.current[index],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )

        .to(
          descriptionsRef.current[index],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.3"
        )

        .to(card, {
          scale: 1.03,
          duration: 0.4,
          ease: "power1.inOut",
        })
        .to(card, {
          scale: 1,
          duration: 0.4,
          ease: "power1.inOut",
        });

      masterTl.add(cardTl, index * 0.2);
    });

    cards.forEach((card, index) => {
      const title = titlesRef.current[index];
      const description = descriptionsRef.current[index];

      card?.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -15,
          scale: 1.05,
          backgroundColor: "rgba(var(--card-rgb, 255, 255, 255), 0.05)",
          borderColor: "rgba(var(--card-border-rgb, 200, 200, 200), 0.3)",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(title, {
          scale: 1.05,
          color: "var(--primary, #0070f3)",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(description, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card?.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(title, {
          scale: 1,
          color: "inherit",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(description, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      cards.forEach((card, index) => {
        card?.removeEventListener("mouseenter", () => {});
        card?.removeEventListener("mouseleave", () => {});
      });
      masterTl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [subservices, pathname]);

  return (
    <section
      ref={sectionRef}
      className="container py-10 flex flex-col gap-10 md:gap-20"
    >
      <h2 className="text-body-lg md:text-h6 text-white">What We Offer</h2>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 2xl:gap-20 justify-center items-start text-start">
        {subservices.map((subservice, index) => (
          <div
            key={subservice.title}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="flex flex-col gap-4 text-h4 md:text-h1 p-8 rounded-xl transition-all duration-300 "
          >
            <h2
              ref={(el) => {
                titlesRef.current[index] = el;
              }}
            >
              {subservice.title}
            </h2>
            <p
              className="text-h6 md:text-h3"
              ref={(el) => {
                descriptionsRef.current[index] = el;
              }}
            >
              {subservice.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
