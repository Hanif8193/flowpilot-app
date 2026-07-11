import { Check } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'

const featureList = [
  'Real-time analytics',
  'AI workflow suggestions',
  'Team collaboration',
  'Secure cloud sync',
]

export function Dashboard() {
  return (
    <section id="dashboard">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                See FlowPilot in Action
              </h2>
              <p className="text-lg text-muted-foreground">
                Monitor workflows, automate repetitive tasks, and gain insights
                from one beautiful dashboard.
              </p>
            </div>

            <ul className="space-y-3">
              {featureList.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="size-3 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#waitlist"
              aria-label="Get early access to FlowPilot"
              className={buttonVariants({ size: 'lg' })}
            >
              Get Early Access
            </a>
          </div>

          {/* Dashboard Preview */}
          <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            {/* Top Navigation */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1">
                <div className="mx-auto flex max-w-sm items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5">
                  <div className="size-3.5 rounded-sm bg-muted-foreground/30" />
                  <div className="h-2 w-24 rounded bg-muted-foreground/20" />
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="hidden w-44 shrink-0 border-r border-border p-3 md:block">
                <div className="mb-4 flex items-center gap-2 rounded-md bg-primary/10 px-2.5 py-2">
                  <div className="size-4 rounded bg-primary" />
                  <span className="text-xs font-semibold text-primary">
                    FlowPilot
                  </span>
                </div>
                <nav className="space-y-1" aria-label="Dashboard navigation">
                  {[
                    { label: 'Overview', active: true },
                    { label: 'Workflows', active: false },
                    { label: 'Analytics', active: false },
                    { label: 'Settings', active: false },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${
                        item.active
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4">
                {/* Analytics Cards */}
                <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      label: 'Workflows',
                      value: '128',
                      change: '+12%',
                      color: 'text-emerald-500',
                    },
                    {
                      label: 'Tasks Done',
                      value: '2,847',
                      change: '+8%',
                      color: 'text-emerald-500',
                    },
                    {
                      label: 'Time Saved',
                      value: '184h',
                      change: '+23%',
                      color: 'text-emerald-500',
                    },
                    {
                      label: 'Team Members',
                      value: '24',
                      change: '+2',
                      color: 'text-blue-500',
                    },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-lg border border-border p-3"
                    >
                      <p className="text-[10px] font-medium text-muted-foreground">
                        {card.label}
                      </p>
                      <p className="mt-1 text-lg font-bold">{card.value}</p>
                      <p className={`text-[10px] font-medium ${card.color}`}>
                        {card.change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="mb-4 rounded-lg border border-border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold">Workflow Activity</p>
                    <div className="flex gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="inline-block size-1.5 rounded-full bg-primary" />
                        Executions
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="inline-block size-1.5 rounded-full bg-primary/30" />
                        Errors
                      </span>
                    </div>
                  </div>
                  <div className="flex h-28 items-end gap-1" aria-hidden="true">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                      (h, i) => (
                        <div key={i} className="flex flex-1 flex-col gap-0.5">
                          <div
                            className="rounded-t bg-primary/80"
                            style={{ height: `${h}%` }}
                          />
                          <div
                            className="rounded-t bg-primary/20"
                            style={{ height: `${Math.max(h * 0.15, 4)}%` }}
                          />
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-2 flex justify-between text-[9px] text-muted-foreground">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Activity Table */}
                <div className="overflow-hidden rounded-lg border border-border">
                  <div className="border-b border-border px-3 py-2">
                    <p className="text-xs font-semibold">Recent Activity</p>
                  </div>
                  <div className="divide-y divide-border">
                    {[
                      {
                        name: 'Deploy Pipeline',
                        status: 'Completed',
                        time: '2m ago',
                        statusColor:
                          'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                      },
                      {
                        name: 'Code Review Bot',
                        status: 'Running',
                        time: '5m ago',
                        statusColor:
                          'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                      },
                      {
                        name: 'Weekly Report',
                        status: 'Scheduled',
                        time: '1h ago',
                        statusColor:
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                      },
                    ].map((row) => (
                      <div
                        key={row.name}
                        className="flex items-center justify-between px-3 py-2"
                      >
                        <div>
                          <p className="text-xs font-medium">{row.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {row.time}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${row.statusColor}`}
                        >
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
