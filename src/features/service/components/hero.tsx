import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

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
  return (
    <section className="container flex flex-col gap-10 md:gap-20 mt-20 md:mt-20 pt-16 md:pt-20 pb-10 md:pb-20 md:min-h-screen w-full">
      <div className="flex w-full justify-between flex-col xl:flex-row gap-6">
        <div className="flex flex-col gap-2 text-h6 text-center xl:text-start">
          <h2>{title}</h2>
          <h3 className="hidden xl:block">{subtitle}</h3>
        </div>
        <h1 className="text-h4 md:text-display-xs max-w-4xl text-center xl:text-start">{description}</h1>
      </div>
      <Image src={image} alt={""} className="w-full h-[250px] md:h-[600px] rounded-xl object-cover" />
    </section>
  );
}
