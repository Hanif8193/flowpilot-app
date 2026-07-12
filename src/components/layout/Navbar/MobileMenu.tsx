'use client'

import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { NAV_LINKS } from '@/lib/constants'
import { Button, buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  userName: string | undefined
}

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  function MobileMenu({ isOpen, onClose, isAuthenticated, userName }, ref) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[210] bg-black/50 lg:hidden"
              onClick={onClose}
              aria-hidden="true"
            />

            <motion.div
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="border-border bg-background fixed inset-y-0 right-0 z-[220] flex w-[min(85vw,360px)] flex-col border-l p-6 lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <Link
                  href="/"
                  className="rounded-lg text-xl font-bold tracking-tight"
                  onClick={onClose}
                >
                  FlowPilot
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close navigation menu"
                  onClick={onClose}
                >
                  <X className="size-5" />
                </Button>
              </div>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-1 flex-col gap-1"
              >
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 pt-6">
                <ThemeToggle />
                {isAuthenticated ? (
                  <>
                    <p className="text-muted-foreground text-sm">
                      Signed in as {userName}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        onClose()
                        signOut({ callbackUrl: '/' })
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={buttonVariants({ variant: 'outline' })}
                      onClick={onClose}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className={buttonVariants()}
                      onClick={onClose}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  },
)
