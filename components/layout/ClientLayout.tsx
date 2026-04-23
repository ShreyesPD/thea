'use client'

import { useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import SplashScreen from '@/components/ui/SplashScreen'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    if (isAdminRoute) {
      setShowSplash(false)
      return
    }
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    if (hasSeenSplash) {
      setShowSplash(false)
      return
    }
  }, [isAdminRoute])

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true')
    setShowSplash(false)
  }

  if (isAdminRoute) {
    return <div className="min-h-screen bg-neutral-50 text-charcoal">{children}</div>
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div
        className={`transition-opacity duration-500 ${showSplash ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'}`}
        aria-hidden={showSplash}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </>
  )
}
