// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { cinzel, manrope } from '@/lib/fonts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'FaoDekho - Premium Movie Streaming',
    template: '%s | FaoDekho',
  },
  description: 'Experience cinema like never before. Stream thousands of movies with our vintage-inspired premium platform.',
  keywords: ['movies', 'streaming', 'cinema', 'entertainment', 'premium'],
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${cinzel.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen antialiased">
        {/* Skip to main content - Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-void focus:rounded-vintage"
        >
          Skip to main content
        </a>
        
        {/* Main app wrapper */}
        <div className="relative flex min-h-screen flex-col">
          
          {/* Navbar */}
          <Navbar />
          
          {/* Main content - pt-18 for navbar height (4.5rem = 72px) */}
          <main id="main-content" className="flex-1 pt-18">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  )
}