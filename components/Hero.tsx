// components/Hero.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Star, Calendar, Info } from 'lucide-react';
import { Movie, TVShow } from '@/lib/types';
import { getBackdropUrl, formatYear, formatVoteAverage } from '@/lib/tmdb';

interface HeroProps {
  items: (Movie | TVShow)[];
}

// Auto-slide interval in milliseconds (8 seconds)
const SLIDE_INTERVAL = 8000;

export default function Hero({ items }: HeroProps) {
  // ─────────────────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filter items with backdrop for hero display (top 10)
  const heroItems = items
    .filter(item => item.backdrop_path)
    .slice(0, 10);

  // ─────────────────────────────────────────────────────────────────────
  // Auto-slide Effect
  // ─────────────────────────────────────────────────────────────────────
  const goToNext = useCallback(() => {
    if (heroItems.length <= 1) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 500);
  }, [heroItems.length]);

  useEffect(() => {
    if (heroItems.length <= 1) return;

    const interval = setInterval(goToNext, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [goToNext, heroItems.length]);

  // ─────────────────────────────────────────────────────────────────────
  // Loading State
  // ─────────────────────────────────────────────────────────────────────
  if (!heroItems || heroItems.length === 0) {
    return (
      <section className="relative h-[70vh] sm:h-[75vh] md:h-[80vh] min-h-125 sm:min-h-140 md:min-h-150 flex items-center bg-deep">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-hero-bottom" />
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-xl sm:max-w-2xl animate-pulse">
              <div className="h-5 sm:h-6 w-28 sm:w-32 bg-surface-light rounded-full mb-4 sm:mb-6" />
              <div className="h-10 sm:h-12 md:h-16 w-3/4 bg-surface-light rounded-lg mb-3 sm:mb-4" />
              <div className="h-8 sm:h-10 w-1/2 bg-surface-light rounded-lg mb-4 sm:mb-6" />
              <div className="h-16 sm:h-20 w-full bg-surface-light rounded-lg mb-6 sm:mb-8" />
              <div className="flex gap-3 sm:gap-4">
                <div className="h-10 sm:h-12 w-28 sm:w-36 bg-surface-light rounded-vintage" />
                <div className="h-10 sm:h-12 w-28 sm:w-36 bg-surface-light rounded-vintage" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentItem = heroItems[currentIndex];

  // ─────────────────────────────────────────────────────────────────────
  // Determine Movie vs TV Show
  // ─────────────────────────────────────────────────────────────────────
  const isMovie = 'title' in currentItem;
  
  const title = isMovie ? currentItem.title : currentItem.name;
  const releaseDate = isMovie ? currentItem.release_date : currentItem.first_air_date;
  const year = formatYear(releaseDate);
  const rating = formatVoteAverage(currentItem.vote_average);
  const overview = currentItem.overview;
  
  const mediaType = isMovie ? 'movie' : 'tv';
  const watchUrl = `/watch/${mediaType}/${currentItem.id}`;
  const detailsUrl = `/${mediaType}/${currentItem.id}`;
  const backdropUrl = getBackdropUrl(currentItem.backdrop_path, 'original');

  return (
    <section className="relative h-[70vh] sm:h-[75vh] md:h-[80vh] min-h-125 sm:min-h-140 md:min-h-150 flex items-end pb-20 sm:pb-16 md:items-center md:pb-0 overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════
          BACKGROUND IMAGE with Fade Transition
          ═══════════════════════════════════════════════════════════════ */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src={backdropUrl}
          alt={title}
          fill
          priority
          quality={85}
          className="object-cover object-top sm:object-center"
          sizes="100vw"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-void via-void/80 sm:via-void/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-void via-void/60 sm:via-void/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-linear-to-t from-void to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENT with Fade Transition
          ═══════════════════════════════════════════════════════════════ */}
      <div className={`relative z-10 w-full transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-xl sm:max-w-2xl xl:max-w-3xl">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 sm:mb-5 md:mb-6 bg-gold/15 border border-gold/30 rounded-full">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold fill-gold" />
              <span className="text-[11px] sm:text-xs font-medium text-gold uppercase tracking-wide">
                Featured {isMovie ? 'Film' : 'Series'}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-text-main leading-tight mb-3 sm:mb-4 md:mb-6">
              <span className="text-gradient-gold">{title}</span>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base text-text-muted mb-3 sm:mb-4 md:mb-6">
              {currentItem.vote_average > 0 && (
                <span className="flex items-center gap-1 sm:gap-1.5 text-gold">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-gold" />
                  <span className="font-semibold">{rating}</span>
                </span>
              )}
              
              <span className="flex items-center gap-1 sm:gap-1.5">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {year}
              </span>
              
              <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 bg-surface-light/80 border border-border-light rounded-full text-[10px] sm:text-xs text-text-warm">
                {isMovie ? 'Movie' : 'TV Series'}
              </span>
            </div>

            {/* Overview */}
            {overview && (
              <p className="text-text-warm text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
                {overview}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              <Link 
                href={watchUrl} 
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-gold hover:bg-gold-light text-void font-semibold text-xs sm:text-sm uppercase tracking-wide rounded-vintage shadow-gold-sm hover:shadow-gold-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>Watch Now</span>
              </Link>
              
              <button className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-transparent hover:bg-gold/10 text-gold font-semibold text-xs sm:text-sm uppercase tracking-wide border border-gold rounded-vintage transition-all duration-300">
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Add to List</span>
              </button>
              
              <Link 
                href={detailsUrl} 
                className="hidden sm:inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-text-main hover:text-gold hover:bg-surface-light/50 font-medium text-xs sm:text-sm rounded-vintage transition-all duration-300"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>More Info</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}