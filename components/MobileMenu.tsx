'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, Heart, Film } from 'lucide-react'

interface NavLink {
  name: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: NavLink[]
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  
  // Prevent body scroll when menu is open
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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-void/95 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="relative flex flex-col h-full p-6 animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            onClick={onClose}
            className="font-cinzel text-2xl font-bold text-gold drop-shadow-md"
          >
            FaoDekho
          </Link>
          
          <button
            onClick={onClose}
            className="btn-icon"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-6 flex-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className="font-cinzel text-3xl text-text-main hover:text-gold transition-colors duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="space-y-4 pt-8 border-t border-sepia/30">
          
          {/* Support Us Button - Inside Mobile Menu */}
          <Link
            href="/support"
            onClick={onClose}
            className="btn-primary w-full justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            <span>Support Us</span>
          </Link>

          {/* Tagline */}
          <p className="text-text-muted text-sm text-center flex items-center justify-center gap-2">
            <Film className="w-4 h-4" />
            Made for Movie Lovers
          </p>
        </div>
      </div>
    </div>
  )
}