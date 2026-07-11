import {
  Bot,
  GitBranch,
  Users,
  BarChart3,
  ShieldCheck,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'AI Automation',
    description:
      'Leverage machine learning to automate repetitive tasks and free your team to focus on what matters most.',
  },
  {
    icon: GitBranch,
    title: 'Smart Workflows',
    description:
      "Design intelligent workflows that adapt to your team's processes and scale with your business needs.",
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      "Seamless real-time collaboration tools that keep everyone aligned and productive across distributed teams.",
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description:
      "Gain deep insights into your team's performance with real-time dashboards and actionable analytics.",
  },
  {
    icon: ShieldCheck,
    title: 'Secure Cloud',
    description:
      'Enterprise-grade security with end-to-end encryption, SOC 2 compliance, and automatic backups.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimized for speed with sub-second response times and instant deployments across global regions.',
  },
]

export function Features() {
  return (
    <section id="features">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to automate your workflow
          </h2>
          <p className="text-lg text-muted-foreground">
            FlowPilot combines powerful AI capabilities with intuitive tools to
            transform how your team builds and ships software.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
