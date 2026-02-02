// app/page.tsx
import { Play, Star, Clock, TrendingUp, Film } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative">
      {/* ══════════════════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-150 flex items-center">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-deep">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-hero-bottom" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-up">
            {/* Badge */}
            <div className="badge-gold mb-6">
              <Star className="w-3 h-3" />
              Featured Film
            </div>
            
            {/* Title */}
            <h1 className="font-cinzel text-display-2 md:text-display-1 text-text-main mb-4">
              The Grand
              <span className="text-gradient-gold block">Budapest Hotel</span>
            </h1>
            
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-text-muted mb-6">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gold" />
                8.1
              </span>
              <span>2014</span>
              <span>1h 40m</span>
              <span className="badge-surface">Comedy</span>
            </div>
            
            {/* Description */}
            <p className="text-text-warm text-body-lg mb-8 line-clamp-3">
              A writer encounters the owner of an aging high-class hotel, 
              who tells him of his early years serving as a lobby boy in 
              the hotel&apos;s glorious years under an exceptional concierge.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">
                <Play className="w-5 h-5" />
                Watch Now
              </button>
              <button className="btn-secondary">
                More Info
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* ══════════════════════════════════════════════════════════════════
          TRENDING SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-cinzel text-heading-3 text-text-main flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-gold" />
              Trending Now
            </h2>
            <button className="btn-ghost text-sm">
              View All
            </button>
          </div>
          
          {/* Movie Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="card group cursor-pointer">
                {/* Poster */}
                <div className="movie-poster bg-surface-light">
                  {/* Placeholder gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-gold-dark/20 to-surface" />
                  
                  {/* Overlay on hover */}
                  <div className="movie-poster-overlay">
                    <button className="btn-icon bg-gold/90 hover:bg-gold text-void border-0">
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-3">
                  <h3 className="font-cinzel text-sm text-text-main line-clamp-1 group-hover:text-gold transition-colors">
                    Movie Title {item}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-gold" />
                      7.{item}
                    </span>
                    <span>•</span>
                    <span>202{item}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ══════════════════════════════════════════════════════════════════
          CONTINUE WATCHING SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-8 bg-deep">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-cinzel text-heading-3 text-text-main flex items-center gap-3">
              <Clock className="w-6 h-6 text-gold" />
              Continue Watching
            </h2>
          </div>
          
          {/* Horizontal Scroll */}
          <div className="scroll-x gap-4 pb-4 -mx-6 px-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div 
                key={item} 
                className="card group cursor-pointer shrink-0 w-72"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-surface-light overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-gold-dark/20 to-surface" />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="btn-icon bg-gold/90 hover:bg-gold text-void border-0 w-14 h-14">
                      <Play className="w-7 h-7" />
                    </button>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className="progress-bar h-1 rounded-none">
                      <div 
                        className="progress-bar-fill rounded-none" 
                        style={{ width: `${20 + item * 15}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4">
                  <h3 className="font-cinzel text-sm text-text-main line-clamp-1 group-hover:text-gold transition-colors">
                    Movie Title {item}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    {20 + item * 15}min remaining
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ══════════════════════════════════════════════════════════════════
          COMPONENT SHOWCASE
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="section-title mb-12">
            <Film className="w-5 h-5 text-gold" />
            Design System Preview
          </h2>
          
          {/* Buttons */}
          <div className="card-glass p-8 mb-8">
            <h3 className="font-cinzel text-heading-4 text-text-main mb-6">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-ghost">Ghost Button</button>
              <button className="btn-icon">
                <Play className="w-5 h-5" />
              </button>
              <button className="btn-primary" disabled>Disabled</button>
            </div>
          </div>
          
          {/* Form Elements */}
          <div className="card-glass p-8 mb-8">
            <h3 className="font-cinzel text-heading-4 text-text-main mb-6">Form Elements</h3>
            <div className="max-w-md space-y-4">
              <input 
                type="text" 
                className="input" 
                placeholder="Enter your email..."
              />
              <div className="relative">
                <input 
                  type="search" 
                  className="input-search" 
                  placeholder="Search movies..."
                />
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="card-glass p-8 mb-8">
            <h3 className="font-cinzel text-heading-4 text-text-main mb-6">Badges</h3>
            <div className="flex flex-wrap gap-3">
              <span className="badge-gold">Premium</span>
              <span className="badge-gold">
                <Star className="w-3 h-3" />
                Top Rated
              </span>
              <span className="badge-surface">Action</span>
              <span className="badge-surface">Drama</span>
              <span className="badge-surface">2024</span>
            </div>
          </div>
          
          {/* Typography */}
          <div className="card-glass p-8 mb-8">
            <h3 className="font-cinzel text-heading-4 text-text-main mb-6">Typography</h3>
            <div className="space-y-4">
              <p className="font-cinzel text-display-1">Display 1 - Cinzel</p>
              <p className="font-cinzel text-display-2">Display 2 - Cinzel</p>
              <p className="font-cinzel text-heading-1">Heading 1</p>
              <p className="font-cinzel text-heading-2">Heading 2</p>
              <p className="font-cinzel text-heading-3">Heading 3</p>
              <p className="font-cinzel text-heading-4">Heading 4</p>
              <p className="text-body-lg">Body Large - Manrope font for readable content.</p>
              <p className="text-body">Body - Default paragraph text with warm coloring.</p>
              <p className="text-body-sm text-text-muted">Body Small - Muted secondary text.</p>
            </div>
          </div>
          
          {/* Colors */}
          <div className="card-glass p-8">
            <h3 className="font-cinzel text-heading-4 text-text-main mb-6">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Backgrounds */}
              <div>
                <p className="text-caption text-text-muted mb-2 uppercase tracking-wider">Backgrounds</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-void border border-sepia" />
                    <span className="text-body-sm">Void</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-deep border border-sepia" />
                    <span className="text-body-sm">Deep</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-surface border border-sepia" />
                    <span className="text-body-sm">Surface</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-surface-light border border-sepia" />
                    <span className="text-body-sm">Surface Light</span>
                  </div>
                </div>
              </div>
              
              {/* Gold */}
              <div>
                <p className="text-caption text-text-muted mb-2 uppercase tracking-wider">Gold Accents</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-gold shadow-gold-sm" />
                    <span className="text-body-sm">Gold</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-gold-light" />
                    <span className="text-body-sm">Gold Light</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-gold-dark" />
                    <span className="text-body-sm">Gold Dark</span>
                  </div>
                </div>
              </div>
              
              {/* Text */}
              <div>
                <p className="text-caption text-text-muted mb-2 uppercase tracking-wider">Text Colors</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-text-main" />
                    <span className="text-body-sm">Main</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-text-warm" />
                    <span className="text-body-sm">Warm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-text-muted" />
                    <span className="text-body-sm">Muted</span>
                  </div>
                </div>
              </div>
              
              {/* Borders */}
              <div>
                <p className="text-caption text-text-muted mb-2 uppercase tracking-wider">Borders</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-sepia" />
                    <span className="text-body-sm">Sepia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-vintage bg-border-light" />
                    <span className="text-body-sm">Border Light</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Decorative Divider */}
      <div className="divider-gold mx-auto max-w-md my-16" />
      
      {/* Footer placeholder */}
      <footer className="py-12 px-6 bg-deep border-t border-sepia">
        <div className="container mx-auto text-center">
          <h2 className="font-cinzel text-heading-2 text-gradient-gold mb-4">
            FaoDekho
          </h2>
          <p className="text-text-muted text-body-sm">
            Experience cinema like never before.
          </p>
        </div>
      </footer>
    </div>
  )
}