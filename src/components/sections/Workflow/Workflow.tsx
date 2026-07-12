import { Plug, Brain, Bot, ChartNoAxesColumn } from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: Plug,
    title: 'Connect Your Tools',
    description:
      'Connect GitHub, Slack, Notion, Google Drive and hundreds of other apps.',
  },
  {
    step: 2,
    icon: Brain,
    title: 'AI Understands Your Workflow',
    description:
      'FlowPilot analyzes your processes and discovers automation opportunities.',
  },
  {
    step: 3,
    icon: Bot,
    title: 'Automate Repetitive Tasks',
    description: 'Create intelligent workflows that execute automatically.',
  },
  {
    step: 4,
    icon: ChartNoAxesColumn,
    title: 'Track Results',
    description: 'Monitor performance with real-time dashboards and analytics.',
  },
]

export function Workflow() {
  return (
    <section id="workflow">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            How FlowPilot Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Four simple steps to automate your workflow with AI.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.step}
                className="group border-border bg-card relative rounded-xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="bg-primary text-primary-foreground absolute -top-3 left-6 flex size-7 items-center justify-center rounded-full text-xs font-bold">
                  {step.step}
                </div>
                <div className="bg-primary/10 mt-2 mb-4 flex size-12 items-center justify-center rounded-lg">
                  <Icon className="text-primary size-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
