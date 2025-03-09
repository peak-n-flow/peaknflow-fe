import React from "react";
import { SubService } from "../types";

export default function ServiceOffer({
  subservices,
}: {
  subservices: SubService[];
}) {
  return (
    <section className="container py-10 flex flex-col gap-10 ">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 2xl:gap-20 justify-center items-center text-center">
        {subservices.map((subservice) => (
          <div
            key={subservice.title}
            className="flex flex-col gap-4 text-h4 md:text-h1"
          >
            <h2>{subservice.title}</h2>
            <p className="text-h6 md:text-h3">{subservice.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
