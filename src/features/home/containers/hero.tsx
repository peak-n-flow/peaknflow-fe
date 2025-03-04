import Image from "next/image";
import React from "react";
import HomeBackground from "@/assets/images/hero-bg.png";
export default function Hero() {
  return (
    <section className="min-h-screen h-screen relative flex justify-center items-center w-full">
      <Image
        src={HomeBackground}
        alt=""
        className="absolute w-screen h-screen z-10"
      />
      <h1 className="container w-full xl:hidden text-display-sm text-center md:text-display-xxl z-20 text-white">
        Elevate Your Recovery & Fitness in a Private Space
      </h1>
      <div className="hidden xl:block container relative -bottom-[20vh]">
        <h1 className="hidden xl:block absolute left-0 text-display-lg text-center md:text-start md:text-display-xxl z-20 text-white max-w-3xl">
          Elevate Your Recovery & Fitness in a Private Space
        </h1>
      </div>
    </section>
  );
}
