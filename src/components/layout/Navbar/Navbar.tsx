'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { LogOut, Menu, X } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle'

export function Navbar() {
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [MobileMenu, setMobileMenu] = useState<React.ComponentType<{
    isOpen: boolean
    onClose: () => void
    isAuthenticated: boolean
    userName: string | undefined
    ref?: React.Ref<HTMLDivElement>
  }> | null>(null)

  const close = useCallback(() => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    if (drawerRef.current) {
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length > 0) {
        focusable[0].focus()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  useEffect(() => {
    if (isOpen && !MobileMenu) {
      import('./MobileMenu').then((mod) => setMobileMenu(() => mod.MobileMenu))
    }
  }, [isOpen, MobileMenu])

  const isAuthenticated = !!session?.user
  const userName = session?.user?.name || session?.user?.email

  return (
    <header
      className={cn(
        'sticky top-0 z-[200] transition-colors duration-200',
        scrolled
          ? 'border-border/40 bg-background/80 border-b backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2 rounded-lg">
          <span className="text-xl font-bold tracking-tight">FlowPilot</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground rounded-lg text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <span className="text-muted-foreground text-sm">{userName}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className="mr-1.5 size-3.5" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: 'ghost' })}
              >
                Sign In
              </Link>
              <Link href="/signup" className={buttonVariants()}>
                Get Started
              </Link>
            </>
          )}
        </div>

        <Button
          ref={triggerRef}
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      {MobileMenu && (
        <MobileMenu
          ref={drawerRef}
          isOpen={isOpen}
          onClose={close}
          isAuthenticated={isAuthenticated}
          userName={userName ?? undefined}
        />
      )}
    </header>
  )
}
