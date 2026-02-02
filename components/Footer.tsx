import Link from 'next/link'
import { Film, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ]

  return (
    <footer className="bg-deep border-t border-sepia/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex flex-col items-center gap-6">
          
          {/* Logo */}
          <Link
            href="/"
            className="font-cinzel text-2xl font-bold text-gold drop-shadow-md glow-text-hover"
          >
            FaoDekho
          </Link>

          {/* Tagline */}
          <p className="text-text-muted text-sm flex items-center gap-2">
            <Film className="w-4 h-4 text-gold" />
            Made for Movie Lovers
          </p>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-muted hover:text-gold-light transition-colors duration-300 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Decorative Divider */}
          <div className="divider-gold w-48 my-2" />

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-text-muted text-caption">
              © {currentYear} FaoDekho. All rights reserved.
            </p>
            <p className="text-text-muted text-caption flex items-center justify-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-gold fill-gold" /> for cinema enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}