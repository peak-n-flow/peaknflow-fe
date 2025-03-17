import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { FAQ } from "../data/faq";

export default function FAQContainer({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="bg-secondary-100 py-16 md:py-24">
      <div className="container flex flex-col gap-10 md:gap-20">
        <h1>FREQUENTLY ASK QUESTION</h1>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-10 md:space-y-20"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-h6 md:text-display-sm text-start">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-body-lg md:text-h3">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
