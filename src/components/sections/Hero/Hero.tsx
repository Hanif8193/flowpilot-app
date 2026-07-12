import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background:
          'var(--gradient-hero-bg, radial-gradient(circle at top, #ede9fe 0%, #ffffff 70%))',
      }}
    >
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              🚀 Now in Early Access
            </Badge>

            <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Automate your workflow with{' '}
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                AI Power
              </span>
            </h1>

            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
              FlowPilot helps modern teams automate repetitive tasks, streamline
              development workflows, and ship products faster with the power of
              Artificial Intelligence.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#waitlist"
                aria-label="Join the waitlist"
                className={buttonVariants({
                  size: 'lg',
                })}
              >
                Join Waitlist
              </a>

              <a
                href="#workflow"
                aria-label="See workflow demo"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'lg',
                })}
              >
                See Demo
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mx-auto w-full max-w-[700px]">
            <Image
              src="https://placehold.co/700x600/png"
              alt="FlowPilot AI workflow automation dashboard showing connected tools, automated tasks, and real-time analytics"
              width={700}
              height={600}
              priority
              className="h-auto w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
