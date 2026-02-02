'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${
          isScrolled
            ? 'bg-void/95 backdrop-blur-md border-sepia/30 shadow-lg shadow-void/50'
            : 'bg-void/0 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Logo */}
            <Link
              href="/"
              className="font-cinzel text-2xl font-bold text-gold drop-shadow-md hover:drop-shadow-lg transition-all duration-300 glow-text-hover"
            >
              FaoDekho
            </Link>

            {/* Desktop Navigation - Shows at 768px and above */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-text-main hover:text-gold-light transition-colors duration-300 text-sm font-medium tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              
              {/* Search Button - Always visible */}
              <button
                className="btn-icon"
                aria-label="Search movies"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Support Us Button - Only Desktop (768px+) */}
              <Link
                href="/support"
                className="hidden md:inline-flex items-center justify-center gap-2 px-4 py-2 bg-transparent text-gold font-semibold text-sm uppercase tracking-wide rounded-vintage border border-gold hover:bg-gold/10 transition-all duration-300"
              >
                Support Us
              </Link>

              {/* Mobile Menu Toggle - Only Mobile (<768px) */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-surface border border-sepia text-text-main hover:bg-surface-light hover:text-gold hover:border-gold-dark transition-all duration-300 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
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