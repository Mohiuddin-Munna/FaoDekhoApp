// components/Footer.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Film, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ]

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
    // If on other page, Link will navigate to '/'
  }

  return (
    <footer className="bg-deep border-t border-sepia/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 md:py-12">
        
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          
          {/* ═══════════════════════════════════════════════════════════════
              LOGO - Smooth Scroll to Top
              ═══════════════════════════════════════════════════════════ */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="font-cinzel text-xl sm:text-2xl font-bold text-gold drop-shadow-md glow-text-hover transition-all duration-300"
          >
            FaoDekho
          </Link>

          {/* Tagline */}
          <p className="text-text-muted text-xs sm:text-sm flex items-center gap-2">
            <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
            Made for Movie Lovers
          </p>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-muted hover:text-gold-light transition-colors duration-300 text-xs sm:text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Decorative Divider */}
          <div className="divider-gold w-32 sm:w-48 my-1 sm:my-2" />

          {/* Copyright */}
          <div className="text-center space-y-1 sm:space-y-2">
            <p className="text-text-muted text-[10px] sm:text-caption">
              © {currentYear} FaoDekho. All rights reserved.
            </p>
            <p className="text-text-muted text-[10px] sm:text-caption flex items-center justify-center gap-1">
              Crafted with <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold fill-gold" /> for cinema enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}