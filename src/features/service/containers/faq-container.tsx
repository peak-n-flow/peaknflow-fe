import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "../data/faq";

export default function FAQContainer({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="bg-[#1A1A1A] text-white py-16 md:py-24">
      <div className="container flex flex-col gap-10 md:gap-20">
        <h1>FREQUENTLY ASK QUESTION</h1>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-10 md:space-y-20"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-h6 md:text-display-sm text-start items-start font-light">
                <div className="flex items-start gap-4 md:gap-16 lg:gap-24 xl:gap-32">
                  <span className="italic text-gray-500">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span className="max-w-screen-md">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-6 md:mt-20">
                <div className="max-w-screen-md text-white/80 text-body-lg md:text-h6 pl-10 md:pl-16">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
