// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu } from 'lucide-react'
import MobileMenu from './MobileMenu'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Movies', href: '/movies' },
  { name: 'Series', href: '/series' },
  { name: 'My List', href: '/my-list' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ─────────────────────────────────────────────────────────────────────
  // Smooth Scroll to Top
  // ─────────────────────────────────────────────────────────────────────
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If already on homepage, prevent navigation and just scroll to top
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    // If on other page, Link will navigate to '/' and useEffect will handle scroll
  }

  // Scroll to top when navigating to homepage
  useEffect(() => {
    if (pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${
          isScrolled
            ? 'bg-void/95 backdrop-blur-md border-sepia/30 shadow-lg shadow-void/50'
            : 'bg-void/0 border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* ═══════════════════════════════════════════════════════════════
                LOGO - Smooth Scroll to Top
                ═══════════════════════════════════════════════════════════ */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="font-cinzel text-xl sm:text-2xl font-bold text-gold drop-shadow-md hover:drop-shadow-lg transition-all duration-300 glow-text-hover"
            >
              FaoDekho
            </Link>

            {/* Desktop Navigation - Shows at 768px and above */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                    pathname === link.href
                      ? 'text-gold'
                      : 'text-text-main hover:text-gold-light'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Search Button - Always visible */}
              <button
                className="btn-icon w-9 h-9 sm:w-10 sm:h-10"
                aria-label="Search movies"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Support Us Button - Only Desktop (768px+) */}
              <Link
                href="/support"
                className="hidden md:inline-flex items-center justify-center gap-2 px-3 lg:px-4 py-2 bg-transparent text-gold font-semibold text-xs sm:text-sm uppercase tracking-wide rounded-vintage border border-gold hover:bg-gold/10 transition-all duration-300"
              >
                Support Us
              </Link>

              {/* Mobile Menu Toggle - Only Mobile (<768px) */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="inline-flex md:hidden items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface border border-sepia text-text-main hover:bg-surface-light hover:text-gold hover:border-gold-dark transition-all duration-300 cursor-pointer"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  )
}