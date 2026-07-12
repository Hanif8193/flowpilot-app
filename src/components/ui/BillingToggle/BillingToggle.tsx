'use client'

interface BillingToggleProps {
  isAnnual: boolean
  onToggle: (annual: boolean) => void
}

export function BillingToggle({ isAnnual, onToggle }: BillingToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={!isAnnual ? 'font-semibold' : 'text-muted-foreground'}>
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isAnnual}
        aria-label="Toggle annual billing"
        onClick={() => onToggle(!isAnnual)}
        className="focus-visible:ring-ring relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        data-state={isAnnual ? 'checked' : 'unchecked'}
      >
        <span
          className="bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform"
          style={{ transform: isAnnual ? 'translateX(20px)' : 'translateX(0)' }}
        />
      </button>
      <span className={isAnnual ? 'font-semibold' : 'text-muted-foreground'}>
        Annual
        {isAnnual && (
          <span className="ml-1 text-sm font-medium text-green-600">
            Save 20%
          </span>
        )}
      </span>
    </div>
  )
}
