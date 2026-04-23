'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, User, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { createClient } from '@/lib/supabase/client'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Lookbook', href: '/lookbook' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
  ]

  useEffect(() => {
    let isMounted = true

    async function checkAdminRole() {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          if (isMounted) setIsAdmin(false)
          return
        }

        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()

        if (isMounted) {
          setIsAdmin(profile?.role === 'admin')
        }
      } catch {
        if (isMounted) setIsAdmin(false)
      }
    }

    checkAdminRole()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-sm border-b border-charcoal/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="relative w-24 h-12 md:w-32 md:h-14 hover:opacity-80 transition-opacity">
            <Image
              src="/thea-logo.png"
              alt="Thea Fashion Boutique"
              fill
              sizes="(max-width: 768px) 40vw, (max-width: 1024px) 25vw, 15vw"
              className="object-contain"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm tracking-wide hover:text-gold transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden md:inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-4 py-2 text-xs tracking-wide uppercase text-charcoal hover:bg-charcoal hover:text-ivory transition"
              >
                Admin Dashboard
              </Link>
            )}
            <Link href="/account" className="hover:text-gold transition-colors">
              <User className="w-5 h-5" />
            </Link>
            
            <Link href="/cart" className="relative hover:text-gold transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-charcoal text-ivory text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-charcoal/10 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm tracking-wide hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
