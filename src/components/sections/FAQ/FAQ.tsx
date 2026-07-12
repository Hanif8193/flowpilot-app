import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

import faqData from '@/data/faq'

export function FAQ() {
  return (
    <section id="faq">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about FlowPilot.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion>
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={String(index)}
                className="border-border bg-card rounded-xl border px-5 shadow-sm transition-shadow not-last:mb-3 hover:shadow-md"
              >
                <AccordionTrigger className="py-4 text-base font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
