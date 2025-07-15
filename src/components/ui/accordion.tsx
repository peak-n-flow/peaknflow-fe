"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "w-full flex flex-1 items-center justify-between py-4 font-medium transition-all",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {children}
        <div
          className={cn(
            "transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          {isOpen ? (
            <Minus className="h-5 md:h-7 w-5 md:w-7  text-secondary-60 shrink-0" />
          ) : (
            <Plus className="h-5 md:h-7 w-5 md:w-7  text-secondary-60 shrink-0" />
          )}
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
