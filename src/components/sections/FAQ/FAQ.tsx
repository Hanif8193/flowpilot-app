import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const faqItems = [
  {
    question: 'What is FlowPilot?',
    answer:
      'FlowPilot is an AI-powered workflow automation platform that helps teams streamline their development processes. It connects to your existing tools, learns your workflows, and suggests or automates repetitive tasks so your team can focus on building great products.',
  },
  {
    question: 'Is there a free plan?',
    answer:
      'Yes. FlowPilot offers a generous free tier that includes up to 3 active workflows, basic AI suggestions, and access to our community support. You can upgrade to a paid plan at any time to unlock additional features and higher usage limits.',
  },
  {
    question: 'Can I integrate GitHub?',
    answer:
      'Absolutely. FlowPilot integrates natively with GitHub (as well as GitLab and Bitbucket). You can automate pull request reviews, branch management, release tagging, and more directly from your repository settings.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Security is a top priority. All data is encrypted at rest and in transit using AES-256. We are SOC 2 Type II certified, run regular penetration tests, and never use customer data to train our AI models. You can also self-host FlowPilot if your organization requires it.',
  },
  {
    question: 'Can teams collaborate?',
    answer:
      'Yes. FlowPilot is built for teams. You can share workflows, assign roles and permissions, leave comments on automation runs, and view a shared activity feed. Real-time collaboration features ensure everyone stays in sync.',
  },
  {
    question: 'Do you provide API access?',
    answer:
      'Our Business and Enterprise plans include full REST and GraphQL API access. You can create, trigger, and monitor workflows programmatically, as well as build custom integrations. Comprehensive API documentation is available in our developer portal.',
  },
]

export function FAQ() {
  return (
    <section id="faq">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about FlowPilot.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion>
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={String(index)}
                className="rounded-xl border border-border bg-card px-5 shadow-sm transition-shadow hover:shadow-md not-last:mb-3"
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
