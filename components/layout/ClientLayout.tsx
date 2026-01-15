'use client'

import { useState, useEffect, ReactNode } from 'react'
import SplashScreen from '@/components/ui/SplashScreen'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    if (hasSeenSplash) {
      setShowSplash(false)
      return
    }
  }, [])

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true')
    setShowSplash(false)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
